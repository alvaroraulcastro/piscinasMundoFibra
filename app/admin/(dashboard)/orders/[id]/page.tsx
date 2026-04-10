export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, ORDER_STATUS_FLOW } from "@/lib/order-utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import OrderActions from "@/components/admin/OrderActions";

type PageParams = Promise<{ id: string }>;

export default async function OrderDetailPage({ params }: { params: PageParams }) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      seller: { select: { id: true, name: true } },
      accesorios: { include: { accesorio: true } },
      history: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!order) notFound();

  const [sellers, waConfig] = await Promise.all([
    prisma.user.findMany({
      where: { role: { in: ["ADMIN", "VENDEDOR"] }, active: true },
      select: { id: true, name: true },
    }),
    prisma.siteConfig.findUnique({ where: { key: "whatsapp_number" } }),
  ]);

  const whatsappNumber = (waConfig?.value ?? "56954088120").replace(/\D/g, "") || "56954088120";

  const volumen = (order.largo * order.ancho * order.profundidad).toFixed(1);
  const area = (order.largo * order.ancho).toFixed(1);
  const allowedTransitions = ORDER_STATUS_FLOW[order.status] ?? [];

  return (
    <div className="space-y-6">
      <nav className="text-sm text-gray-500" aria-label="Migas de pan">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/admin" className="hover:text-brand-blue transition-colors">
              Inicio
            </Link>
          </li>
          <li aria-hidden className="text-gray-300">
            /
          </li>
          <li>
            <Link href="/admin/orders" className="hover:text-brand-blue transition-colors">
              Órdenes
            </Link>
          </li>
          <li aria-hidden className="text-gray-300">
            /
          </li>
          <li className="text-gray-800 font-medium truncate max-w-[min(100vw-8rem,28rem)]">
            {order.orderNumber}
          </li>
        </ol>
      </nav>

      <div className="flex items-start gap-3">
        <Link
          href="/admin/orders"
          className="mt-1.5 text-gray-400 hover:text-brand-blue transition-colors shrink-0 rounded-lg p-1 hover:bg-gray-100"
          aria-label="Volver al listado de órdenes"
        >
          <ArrowLeft size={22} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-gray-900">{order.orderNumber}</h1>
            <Link
              href={`/admin/orders/${order.id}/print`}
              target="_blank"
              className="text-sm font-medium text-brand-cyan hover:text-brand-blue"
            >
              PDF / imprimir
            </Link>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                ORDER_STATUS_COLORS[order.status] ?? "bg-gray-100"
              }`}
            >
              {ORDER_STATUS_LABELS[order.status]}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4">Datos del Cliente</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-400 font-medium">Nombre</p>
                <p className="font-bold text-gray-800">{order.clientName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Email</p>
                <p className="font-bold text-gray-800">{order.clientEmail}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Teléfono</p>
                <p className="font-bold text-gray-800">{order.clientPhone}</p>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4">Especificaciones</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <InfoBox label="Largo" value={`${order.largo} m`} />
              <InfoBox label="Ancho" value={`${order.ancho} m`} />
              <InfoBox label="Profundidad" value={`${order.profundidad} m`} />
              <InfoBox label="Color" value={order.color} />
            </div>
            <div className="bg-brand-cyan/5 rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-brand-blue font-extrabold text-lg">{area} m²</p>
                <p className="text-gray-500 text-xs">Superficie</p>
              </div>
              <div>
                <p className="text-brand-blue font-extrabold text-lg">{volumen} m³</p>
                <p className="text-gray-500 text-xs">Volumen</p>
              </div>
              <div>
                <p className="text-brand-blue font-extrabold text-lg">
                  {Math.round(Number(volumen) * 1000).toLocaleString("es-CL")} L
                </p>
                <p className="text-gray-500 text-xs">Litros</p>
              </div>
            </div>
          </div>

          {/* Accesorios */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4">Accesorios</h2>
            {order.accesorios.length > 0 ? (
              <ul className="space-y-2">
                {order.accesorios.map((oa) => (
                  <li key={oa.id} className="flex items-center gap-2 text-gray-700 text-sm">
                    <span className="w-2 h-2 bg-brand-cyan rounded-full flex-shrink-0" />
                    {oa.accesorio.name}
                    {oa.accesorio.precio && (
                      <span className="text-gray-400 text-xs ml-auto">
                        ${oa.accesorio.precio.toLocaleString("es-CL")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm italic">Sin accesorios seleccionados</p>
            )}
          </div>

          {order.comentarios && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-2">Comentarios del Cliente</h2>
              <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-xl p-4">
                {order.comentarios}
              </p>
            </div>
          )}

          {/* History */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4">Historial</h2>
            <div className="space-y-3">
              {order.history.map((h) => (
                <div key={h.id} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 bg-brand-cyan rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">
                      {h.fromStatus ? (
                        <>
                          <span className="font-medium">{ORDER_STATUS_LABELS[h.fromStatus]}</span>
                          {" → "}
                          <span className="font-medium">{ORDER_STATUS_LABELS[h.toStatus]}</span>
                        </>
                      ) : (
                        <span className="font-medium">{ORDER_STATUS_LABELS[h.toStatus]}</span>
                      )}
                      {h.user && (
                        <span className="text-gray-400 ml-1">por {h.user.name}</span>
                      )}
                    </p>
                    {h.comment && <p className="text-gray-500 text-xs mt-0.5">{h.comment}</p>}
                    <p className="text-gray-400 text-xs mt-0.5">
                      {new Date(h.createdAt).toLocaleString("es-CL")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Actions */}
        <div className="space-y-6">
          <OrderActions
            orderId={order.id}
            orderNumber={order.orderNumber}
            clientName={order.clientName}
            clientPhone={order.clientPhone}
            whatsappNumber={whatsappNumber}
            currentStatus={order.status}
            allowedTransitions={allowedTransitions}
            sellers={sellers}
            currentSellerId={order.sellerId}
            currentPrice={order.precioFinal}
          />

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-sm text-gray-500">
            <p>
              <span className="font-medium text-gray-700">Creada:</span>{" "}
              {new Date(order.createdAt).toLocaleString("es-CL")}
            </p>
            <p className="mt-1">
              <span className="font-medium text-gray-700">Actualizada:</span>{" "}
              {new Date(order.updatedAt).toLocaleString("es-CL")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-brand-blue/5 rounded-xl p-3">
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <p className="font-bold text-gray-800">{value}</p>
    </div>
  );
}
