export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import UsersClient from "@/components/admin/UsersClient";

export default async function UsersPage() {
  const session = await auth();
  if ((session?.user as { role: string })?.role !== "ADMIN") redirect("/admin");

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, phone: true, role: true, active: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900">Usuarios</h1>
      <UsersClient initialUsers={users} />
    </div>
  );
}
