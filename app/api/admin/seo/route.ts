import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const entries = await prisma.seoEntry.findMany({ orderBy: { pageSlug: "asc" } });
  return NextResponse.json(entries);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const data = await req.json();

  const entry = await prisma.seoEntry.upsert({
    where: { pageSlug: data.pageSlug },
    update: {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      ogTitle: data.ogTitle,
      ogDescription: data.ogDescription,
      ogImage: data.ogImage,
    },
    create: data,
  });

  return NextResponse.json(entry);
}
