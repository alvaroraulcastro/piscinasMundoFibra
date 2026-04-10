export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import EmailClient from "@/components/admin/EmailClient";

export default async function EmailPage() {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") redirect("/admin");

  const templates = await prisma.emailTemplate.findMany({ orderBy: { slug: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Plantillas de Email</h1>
        <p className="text-gray-500 text-sm">Edita las plantillas de correo que el sistema envía automáticamente.</p>
      </div>
      <EmailClient templates={templates} />
    </div>
  );
}
