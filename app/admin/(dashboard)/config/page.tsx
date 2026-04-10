export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ConfigClient from "@/components/admin/ConfigClient";

export default async function ConfigPage() {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") redirect("/admin");

  const configs = await prisma.siteConfig.findMany({ orderBy: { key: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Configuración General</h1>
        <p className="text-gray-500 text-sm">Datos de contacto, SMTP, secciones activas y textos del sitio.</p>
      </div>
      <ConfigClient configs={configs} />
    </div>
  );
}
