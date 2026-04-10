export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/order-utils";
import Link from "next/link";
import {
  ShoppingCart,
  Users,
  DollarSign,
  Clock,
  ArrowRight,
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();
  const userName = session?.user?.name ?? "Admin";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalOrders, todayOrders, pendingOrders, totalClients, statusCounts, recentOrders, revenue] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: today } } }),
      prisma.order.count({ where: { status: { in: ["NUEVA", "EN_REVISION", "COTIZADA"] } } }),
      prisma.order.findMany({ select: { clientEmail: true }, distinct: ["clientEmail"] }),
      prisma.order.groupBy({ by: ["status"], _count: { id: true } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          orderNumber: true,
          clientName: true,
          status: true,
          color: true,
          largo: true,
          ancho: true,
          createdAt: true,
        },
      }),
      prisma.order.aggregate({ _sum: { precioFinal: true } }),
    ]);

  const metrics = [
    {
      label: "Total Órdenes",
      value: totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-500",
      href: "/admin/orders",
    },
    {
      label: "Hoy",
      value: todayOrders,
      icon: Clock,
      color: "bg-brand-cyan",
      href: "/admin/orders",
    },
    {
      label: "Pendientes",
      value: pendingOrders,
      icon: Clock,
      color: "bg-yellow-500",
      href: "/admin/orders?status=NUEVA",
    },
    {
      label: "Emails únicos",
      value: totalClients.length,
      icon: Users,
      color: "bg-green-500",
      href: "/admin/orders",
    },
  ];

  const totalRevenue = revenue._sum.precioFinal ?? 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Hola, {userName}</h1>
        <p className="text-gray-500 text-sm mt-1">Resumen de actividad de Piscinas Mundo Fibra</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.label}
              href={m.href}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${m.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="text-white" size={20} />
                </div>
                <ArrowRight
                  size={16}
                  className="text-gray-300 group-hover:text-brand-cyan transition-colors"
                />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{m.value}</p>
              <p className="text-gray-500 text-sm">{m.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Revenue card */}
      <div className="bg-gradient-pool rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <DollarSign size={24} />
          <span className="text-white/70 text-sm">Ingresos cotizados</span>
        </div>
        <p className="text-3xl font-extrabold">
          ${totalRevenue.toLocaleString("es-CL")} CLP
        </p>
        <p className="text-white/50 text-xs mt-1">Total acumulado de órdenes con precio asignado</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Distribución por Estado</h2>
          <div className="space-y-3">
            {statusCounts.length === 0 && (
              <p className="text-gray-400 text-sm italic">Sin órdenes aún</p>
            )}
            {statusCounts.map((s) => (
              <div key={s.status} className="flex items-center gap-3">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    ORDER_STATUS_COLORS[s.status] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {ORDER_STATUS_LABELS[s.status] ?? s.status}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-brand-cyan h-2 rounded-full transition-all"
                    style={{
                      width: `${totalOrders > 0 ? (s._count.id / totalOrders) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-700 w-8 text-right">
                  {s._count.id}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Últimas Órdenes</h2>
            <Link href="/admin/orders" className="text-brand-cyan text-sm font-medium hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.length === 0 && (
              <p className="text-gray-400 text-sm italic">Sin órdenes aún</p>
            )}
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{order.orderNumber}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {order.clientName} · {order.largo}×{order.ancho}m · {order.color}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0 ${
                    ORDER_STATUS_COLORS[order.status] ?? "bg-gray-100"
                  }`}
                >
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
