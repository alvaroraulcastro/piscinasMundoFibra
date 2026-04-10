"use client";

import { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  PackageSearch,
  Mail,
  Search,
  Settings,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { adminSectionTitle } from "@/lib/admin-ui";

type AdminUser = { name: string; email: string; role: string };

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Órdenes", href: "/admin/orders", icon: ShoppingCart },
  { name: "Usuarios", href: "/admin/users", icon: Users, adminOnly: true },
  { name: "Catálogo", href: "/admin/catalog", icon: PackageSearch, adminOnly: true },
  { name: "Correo", href: "/admin/email", icon: Mail, adminOnly: true },
  { name: "SEO", href: "/admin/seo", icon: Search, adminOnly: true },
  { name: "Configuración", href: "/admin/config", icon: Settings, adminOnly: true },
  { name: "Reportes", href: "/admin/reports", icon: BarChart3 },
];

export default function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: AdminUser;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userMenuOpen) return;
    const close = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [userMenuOpen]);

  const filteredNav = navigation.filter(
    (item) => !item.adminOnly || user.role === "ADMIN"
  );

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-dark transform transition-transform lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-2">
              <svg viewBox="0 0 80 50" fill="none" className="w-8 h-5">
                <path
                  d="M20 25C20 19.477 24.477 15 30 15C35.523 15 39 18.5 40 25C41 31.5 44.477 35 50 35C55.523 35 60 30.523 60 25C60 19.477 55.523 15 50 15C44.477 15 41 18.5 40 25C39 31.5 35.523 35 30 35C24.477 35 20 30.523 20 25Z"
                  stroke="#00c8e0"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
              <div>
                <p className="text-white font-bold text-sm leading-none">Mundo Fibra</p>
                <p className="text-brand-cyan text-[10px]">Panel Admin</p>
              </div>
            </Link>
            <button className="lg:hidden text-white/50" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {filteredNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? "bg-brand-cyan/20 text-brand-cyan"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 pb-2">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors border border-white/10"
            >
              <ExternalLink size={16} className="flex-shrink-0" />
              Ver sitio público
            </Link>
          </div>

          {/* User */}
          <div className="px-3 py-4 border-t border-white/10">
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-white/70 hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 bg-brand-cyan/20 rounded-full flex items-center justify-center text-brand-cyan text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-white/40">{user.role}</p>
                </div>
                <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute bottom-full left-0 right-0 mb-1 bg-brand-dark border border-white/10 rounded-xl shadow-xl p-1 z-10"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut size={16} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top bar mobile */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 p-1 rounded-lg hover:bg-gray-100 -ml-1"
            aria-label="Abrir menú de navegación"
          >
            <Menu size={24} />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="font-bold text-brand-blue truncate text-lg leading-tight">
              {adminSectionTitle(pathname)}
            </h1>
            <p className="text-[11px] text-gray-400 truncate">Piscinas Mundo Fibra</p>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </main>
      </div>
    </div>
  );
}
