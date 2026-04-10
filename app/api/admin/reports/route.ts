import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user || !["ADMIN", "VENDEDOR"].includes((session.user as { role: string }).role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const format = searchParams.get("format"); // json | csv

  const dateFilter: Record<string, unknown> = {};
  if (from) dateFilter.gte = new Date(from);
  if (to) dateFilter.lte = new Date(to);

  const where = Object.keys(dateFilter).length > 0 ? { createdAt: dateFilter } : {};

  const [orders, statusCounts, totalClients, recentOrders] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        seller: { select: { name: true } },
        accesorios: { include: { accesorio: { select: { name: true } } } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.groupBy({
      by: ["status"],
      _count: { id: true },
      where,
    }),
    prisma.order.findMany({
      where,
      select: { clientEmail: true },
      distinct: ["clientEmail"],
    }),
    prisma.order.findMany({
      where,
      select: { createdAt: true, status: true, precioFinal: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  // Monthly breakdown
  const monthlyMap: Record<string, { count: number; revenue: number }> = {};
  recentOrders.forEach((o) => {
    const key = `${o.createdAt.getFullYear()}-${String(o.createdAt.getMonth() + 1).padStart(2, "0")}`;
    if (!monthlyMap[key]) monthlyMap[key] = { count: 0, revenue: 0 };
    monthlyMap[key].count++;
    if (o.precioFinal) monthlyMap[key].revenue += o.precioFinal;
  });

  const stats = {
    totalOrders: orders.length,
    totalClients: totalClients.length,
    totalRevenue: orders.reduce((sum, o) => sum + (o.precioFinal || 0), 0),
    statusBreakdown: statusCounts.map((s) => ({ status: s.status, count: s._count.id })),
    monthly: Object.entries(monthlyMap).map(([month, data]) => ({ month, ...data })),
  };

  if (format === "csv") {
    const header = "Orden,Estado,Cliente,Email,Teléfono,Largo,Ancho,Profundidad,Color,Precio,Vendedor,Fecha\n";
    const rows = orders
      .map((o) =>
        [
          o.orderNumber,
          o.status,
          `"${o.clientName}"`,
          o.clientEmail,
          o.clientPhone,
          o.largo,
          o.ancho,
          o.profundidad,
          o.color,
          o.precioFinal ?? "",
          o.seller?.name ?? "",
          o.createdAt.toISOString().split("T")[0],
        ].join(",")
      )
      .join("\n");

    return new NextResponse(header + rows, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=reporte_ordenes_${new Date().toISOString().split("T")[0]}.csv`,
      },
    });
  }

  return NextResponse.json({ stats, orders });
}
