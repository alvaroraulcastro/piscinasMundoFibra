export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/order-utils";
import ReportsClient from "@/components/admin/ReportsClient";

export default async function ReportsPage() {
  const [totalOrders, statusCounts, orders, totalClients] = await Promise.all([
    prisma.order.count(),
    prisma.order.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.order.findMany({
      select: { createdAt: true, status: true, precioFinal: true, color: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.order.findMany({ select: { clientEmail: true }, distinct: ["clientEmail"] }),
  ]);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.precioFinal ?? 0), 0);

  // Monthly data
  const monthlyMap: Record<string, { count: number; revenue: number }> = {};
  orders.forEach((o) => {
    const key = `${o.createdAt.getFullYear()}-${String(o.createdAt.getMonth() + 1).padStart(2, "0")}`;
    if (!monthlyMap[key]) monthlyMap[key] = { count: 0, revenue: 0 };
    monthlyMap[key].count++;
    if (o.precioFinal) monthlyMap[key].revenue += o.precioFinal;
  });
  const monthly = Object.entries(monthlyMap).map(([month, data]) => ({ month, ...data }));

  // Color distribution
  const colorMap: Record<string, number> = {};
  orders.forEach((o) => {
    colorMap[o.color] = (colorMap[o.color] ?? 0) + 1;
  });

  const statusData = statusCounts.map((s) => ({
    status: s.status,
    label: ORDER_STATUS_LABELS[s.status] ?? s.status,
    count: s._count.id,
    color: ORDER_STATUS_COLORS[s.status] ?? "bg-gray-100 text-gray-600",
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Reportes</h1>
        <p className="text-gray-500 text-sm">Análisis y estadísticas de la operación.</p>
      </div>

      <ReportsClient
        totalOrders={totalOrders}
        totalClients={totalClients.length}
        totalRevenue={totalRevenue}
        statusData={statusData}
        monthly={monthly}
        colorDistribution={colorMap}
      />
    </div>
  );
}
