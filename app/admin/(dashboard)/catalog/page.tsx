export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CatalogClient from "@/components/admin/CatalogClient";

export default async function CatalogPage() {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") redirect("/admin");

  const [colors, accesorios, models] = await Promise.all([
    prisma.color.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.accesorio.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.productModel.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900">Catálogo</h1>
      <CatalogClient colors={colors} accesorios={accesorios} models={models} />
    </div>
  );
}
