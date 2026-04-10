export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SeoClient from "@/components/admin/SeoClient";

export default async function SeoPage() {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") redirect("/admin");

  const entries = await prisma.seoEntry.findMany({ orderBy: { pageSlug: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Administrador SEO</h1>
        <p className="text-gray-500 text-sm">Edita los metadatos para mejorar el posicionamiento en buscadores.</p>
      </div>
      <SeoClient entries={entries} />
    </div>
  );
}
