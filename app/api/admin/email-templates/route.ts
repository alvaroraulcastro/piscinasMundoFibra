import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const templates = await prisma.emailTemplate.findMany({ orderBy: { slug: "asc" } });
  return NextResponse.json(templates);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const data = await req.json();

  const template = await prisma.emailTemplate.update({
    where: { id: data.id },
    data: {
      name: data.name,
      subject: data.subject,
      body: data.body,
      active: data.active,
    },
  });

  return NextResponse.json(template);
}
