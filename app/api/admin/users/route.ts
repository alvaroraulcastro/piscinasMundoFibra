import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { sendTemplateEmail } from "@/lib/email";

export async function GET() {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, phone: true, role: true, active: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { name, email, phone, password, role } = await req.json();
  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "El email ya está registrado" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, phone, passwordHash, role },
    select: { id: true, name: true, email: true, role: true },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://piscinasmundofibra.cl";
  sendTemplateEmail("bienvenida", email, { name, email, role, siteUrl }).catch(console.error);

  return NextResponse.json(user, { status: 201 });
}
