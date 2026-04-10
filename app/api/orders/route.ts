import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generateOrderNumber } from "@/lib/order-utils";
import { sendTemplateEmail } from "@/lib/email";
import { rateLimitOrders } from "@/lib/rate-limit-orders";

function clientKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return ip;
}

// POST — Crear orden (público desde cotizador)
export async function POST(req: NextRequest) {
  try {
    const key = clientKey(req);
    if (!rateLimitOrders(key)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Espera un minuto e intenta de nuevo." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { nombre, email, telefono, largo, ancho, profundidad, color, accesorios, comentarios } = body;

    if (!nombre || !email || !telefono || !largo || !ancho || !profundidad || !color) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();

    let accesorioCreates: { accesorioId: string }[] = [];
    if (Array.isArray(accesorios) && accesorios.length > 0) {
      const resolved = await Promise.all(
        (accesorios as string[]).map((slug) =>
          prisma.accesorio.findUnique({ where: { slug } }).then((acc) => (acc ? { accesorioId: acc.id } : null))
        )
      );
      accesorioCreates = resolved.filter((r): r is { accesorioId: string } => r !== null);
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        clientName: nombre,
        clientEmail: email,
        clientPhone: telefono,
        largo: parseFloat(largo),
        ancho: parseFloat(ancho),
        profundidad: parseFloat(profundidad),
        color,
        comentarios: comentarios || null,
        history: {
          create: {
            toStatus: "NUEVA",
            comment: "Orden creada desde cotizador web",
          },
        },
        ...(accesorioCreates.length > 0 && {
          accesorios: { create: accesorioCreates },
        }),
      },
    });

    // Notificaciones por email (no bloquean la respuesta)
    const vars = { orderNumber, clientName: nombre, clientEmail: email, largo, ancho, profundidad, color };

    sendTemplateEmail("confirmacion-cliente", email, vars).catch(console.error);

    const adminEmail = await prisma.siteConfig.findUnique({ where: { key: "email_contact" } });
    if (adminEmail?.value) {
      sendTemplateEmail("nueva-orden", adminEmail.value, { ...vars, adminName: "Admin" }).catch(console.error);
    }

    return NextResponse.json({ orderNumber: order.orderNumber, id: order.id }, { status: 201 });
  } catch (error) {
    console.error("[api/orders POST]", error);
    return NextResponse.json({ error: "Error al crear la orden" }, { status: 500 });
  }
}

// GET — Listar órdenes (solo admin/vendedor)
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user || !["ADMIN", "VENDEDOR"].includes((session.user as { role: string }).role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: "insensitive" } },
      { clientName: { contains: search, mode: "insensitive" } },
      { clientEmail: { contains: search, mode: "insensitive" } },
    ];
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        seller: { select: { id: true, name: true } },
        accesorios: { include: { accesorio: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  return NextResponse.json({ orders, total, page, pages: Math.ceil(total / limit) });
}
