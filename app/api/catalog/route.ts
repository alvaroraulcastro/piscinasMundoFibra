import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/** Catálogo público de solo lectura (colores y accesorios activos). */
export async function GET() {
  try {
    const [colors, accesorios] = await Promise.all([
      prisma.color.findMany({
        where: { active: true },
        orderBy: { sortOrder: "asc" },
        select: { name: true, hex: true, gradient: true },
      }),
      prisma.accesorio.findMany({
        where: { active: true },
        orderBy: { sortOrder: "asc" },
        select: { slug: true, name: true, description: true },
      }),
    ]);
    return NextResponse.json({ colors, accesorios });
  } catch (e) {
    console.error("[api/catalog GET]", e);
    return NextResponse.json({ error: "No disponible" }, { status: 500 });
  }
}
