import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendTemplateEmail } from "@/lib/email";
import { ORDER_STATUS_LABELS, ORDER_STATUS_FLOW } from "@/lib/order-utils";

// GET — Detalle de una orden
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || !["ADMIN", "VENDEDOR"].includes((session.user as { role: string }).role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true, email: true } },
      seller: { select: { id: true, name: true } },
      accesorios: { include: { accesorio: true } },
      history: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!order) return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });
  return NextResponse.json(order);
}

// PATCH — Actualizar orden (estado, vendedor, precio)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || !["ADMIN", "VENDEDOR"].includes((session.user as { role: string }).role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { status, sellerId, precioFinal, comment } = body;

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });

  const updateData: Record<string, unknown> = {};

  if (status && status !== order.status) {
    const allowed = ORDER_STATUS_FLOW[order.status] || [];
    if (!allowed.includes(status)) {
      return NextResponse.json(
        { error: `Transición ${order.status} → ${status} no permitida` },
        { status: 400 }
      );
    }
    updateData.status = status;

    await prisma.orderHistory.create({
      data: {
        orderId: id,
        fromStatus: order.status,
        toStatus: status,
        comment: comment || null,
        userId: session.user.id,
      },
    });

    // Notificar al cliente
    sendTemplateEmail("cambio-estado", order.clientEmail, {
      clientName: order.clientName,
      orderNumber: order.orderNumber,
      oldStatus: ORDER_STATUS_LABELS[order.status] || order.status,
      newStatus: ORDER_STATUS_LABELS[status] || status,
      comment: comment || "",
    }).catch(console.error);
  }

  if (sellerId !== undefined) updateData.sellerId = sellerId;
  if (precioFinal !== undefined) updateData.precioFinal = parseFloat(precioFinal);

  const updated = await prisma.order.update({ where: { id }, data: updateData });
  return NextResponse.json(updated);
}
