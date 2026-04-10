import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const role = (session.user as { role: string }).role;
  if (!["ADMIN", "VENDEDOR"].includes(role)) {
    redirect("/");
  }

  return (
    <AdminShell user={{ name: session.user.name ?? "", email: session.user.email ?? "", role }}>
      {children}
    </AdminShell>
  );
}
