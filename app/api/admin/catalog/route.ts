import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user || !["ADMIN", "VENDEDOR"].includes((session.user as { role: string }).role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const [models, colors, accesorios, gallery] = await Promise.all([
    prisma.productModel.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.color.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.accesorio.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return NextResponse.json({ models, colors, accesorios, gallery });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { type, ...data } = await req.json();

  switch (type) {
    case "model":
      return NextResponse.json(await prisma.productModel.create({ data }), { status: 201 });
    case "color":
      return NextResponse.json(await prisma.color.create({ data }), { status: 201 });
    case "accesorio":
      return NextResponse.json(await prisma.accesorio.create({ data }), { status: 201 });
    case "gallery":
      return NextResponse.json(await prisma.galleryImage.create({ data }), { status: 201 });
    default:
      return NextResponse.json({ error: "Tipo no válido" }, { status: 400 });
  }
}
