import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const updateData: Record<string, unknown> = {};

  if (body.name) updateData.name = body.name;
  if (body.email) updateData.email = body.email;
  if (body.phone !== undefined) updateData.phone = body.phone;
  if (body.role) updateData.role = body.role;
  if (body.active !== undefined) updateData.active = body.active;
  if (body.password) updateData.passwordHash = await bcrypt.hash(body.password, 12);

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: { id: true, name: true, email: true, role: true, active: true },
  });
  return NextResponse.json(user);
}
