export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/order-utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import OrderFilters from "@/components/admin/OrderFilters";
import { ordersListQuery } from "@/lib/admin-orders-query";

type SearchParams = Promise<{ status?: string; search?: string; page?: string }>;

export default async function OrdersPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const status = params.status;
  const search = params.search;
  const page = parseInt(params.page || "1");
  const limit = 20;

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: "insensitive" } },
      { clientName: { contains: search, mode: "insensitive" } },
      { clientEmail: { contains: search, mode: "insensitive" } },
    ];
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { seller: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  const pages = Math.ceil(total / limit);
  const hasActiveFilters = Boolean(status || search);
  const queryBase = (p: number) => ordersListQuery(p, status, search);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Órdenes de compra</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {total === 0
            ? hasActiveFilters
              ? "Sin resultados con los filtros actuales"
              : "No hay órdenes registradas aún"
            : `${total} ${total === 1 ? "orden" : "órdenes"}${hasActiveFilters ? " (con filtros activos)" : ""}`}
        </p>
      </div>

      <OrderFilters currentStatus={status} currentSearch={search} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-5 py-3 font-semibold">Orden</th>
                <th className="px-5 py-3 font-semibold">Cliente</th>
                <th className="px-5 py-3 font-semibold">Dimensiones</th>
                <th className="px-5 py-3 font-semibold">Color</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 font-semibold">Vendedor</th>
                <th className="px-5 py-3 font-semibold">Fecha</th>
                <th className="px-5 py-3 font-semibold w-12">
                  <span className="sr-only">Abrir</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-14 text-center">
                    <p className="text-gray-600 font-medium mb-2">
                      {hasActiveFilters ? "No hay órdenes que coincidan con la búsqueda o el estado." : "Aún no hay órdenes registradas."}
                    </p>
                    <p className="text-gray-400 text-sm mb-4">
                      {hasActiveFilters
                        ? "Prueba con otros términos o restablece los filtros."
                        : "Las cotizaciones del sitio web aparecerán aquí automáticamente."}
                    </p>
                    {hasActiveFilters && (
                      <Link
                        href="/admin/orders"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline"
                      >
                        Ver todas las órdenes
                        <ChevronRight size={16} />
                      </Link>
                    )}
                  </td>
                </tr>
              )}
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-bold text-brand-blue hover:underline focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 rounded"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900">{order.clientName}</p>
                    <p className="text-gray-400 text-xs">{order.clientEmail}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {order.largo}×{order.ancho}×{order.profundidad}m
                  </td>
                  <td className="px-5 py-3 text-gray-600">{order.color}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        ORDER_STATUS_COLORS[order.status] ?? "bg-gray-100"
                      }`}
                    >
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{order.seller?.name ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString("es-CL", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex p-2 rounded-lg text-gray-300 group-hover:text-brand-cyan group-hover:bg-brand-cyan/10 transition-colors"
                      aria-label={`Abrir orden ${order.orderNumber}`}
                    >
                      <ChevronRight size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="px-5 py-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600">
            <span>
              Página <strong className="text-gray-900">{page}</strong> de {pages}
            </span>
            <div className="flex flex-wrap gap-2">
              {page > 1 && (
                <Link
                  href={`/admin/orders${queryBase(1)}`}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                >
                  Primera
                </Link>
              )}
              {page > 1 && (
                <Link
                  href={`/admin/orders${queryBase(page - 1)}`}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Anterior
                </Link>
              )}
              {page < pages && (
                <Link
                  href={`/admin/orders${queryBase(page + 1)}`}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Siguiente
                </Link>
              )}
              {page < pages && (
                <Link
                  href={`/admin/orders${queryBase(pages)}`}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                >
                  Última
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
