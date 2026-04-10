import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const configs = await prisma.siteConfig.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json(configs);
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { entries } = await req.json();

  if (!Array.isArray(entries)) {
    return NextResponse.json({ error: "Se esperaba un array de entries" }, { status: 400 });
  }

  const updated = await Promise.all(
    entries.map(({ key, value }: { key: string; value: string }) =>
      prisma.siteConfig.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )
  );

  return NextResponse.json(updated);
}
