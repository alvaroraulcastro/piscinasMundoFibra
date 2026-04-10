export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ORDER_STATUS_LABELS } from "@/lib/order-utils";
import OrderPrintToolbar from "@/components/admin/OrderPrintToolbar";

type PageParams = Promise<{ id: string }>;

export default async function OrderPrintPage({ params }: { params: PageParams }) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      seller: { select: { name: true } },
      accesorios: { include: { accesorio: true } },
    },
  });

  if (!order) notFound();

  const volumen = (order.largo * order.ancho * order.profundidad).toFixed(1);
  const area = (order.largo * order.ancho).toFixed(1);
  const fecha = new Date(order.createdAt).toLocaleString("es-CL");

  return (
    <div className="max-w-3xl mx-auto bg-white text-gray-900 print:max-w-none print:p-0">
      <OrderPrintToolbar orderId={order.id} />

      <header className="border-b-2 border-brand-cyan pb-4 mb-6">
        <p className="text-xs uppercase tracking-widest text-gray-500">Piscinas Mundo Fibra</p>
        <h1 className="text-2xl font-extrabold text-brand-blue mt-1">Orden de cotización</h1>
        <p className="font-mono text-lg text-brand-cyan mt-2">{order.orderNumber}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
          <span>Estado: {ORDER_STATUS_LABELS[order.status]}</span>
          <span>Creada: {fecha}</span>
          {order.seller && <span>Vendedor: {order.seller.name}</span>}
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Cliente</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Nombre</p>
            <p className="font-semibold">{order.clientName}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-semibold">{order.clientEmail}</p>
          </div>
          <div>
            <p className="text-gray-500">Teléfono</p>
            <p className="font-semibold">{order.clientPhone}</p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Especificaciones</h2>
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="px-3 py-2 bg-gray-50 font-medium text-gray-600">Largo</td>
              <td className="px-3 py-2">{order.largo} m</td>
              <td className="px-3 py-2 bg-gray-50 font-medium text-gray-600">Ancho</td>
              <td className="px-3 py-2">{order.ancho} m</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-3 py-2 bg-gray-50 font-medium text-gray-600">Profundidad</td>
              <td className="px-3 py-2">{order.profundidad} m</td>
              <td className="px-3 py-2 bg-gray-50 font-medium text-gray-600">Color</td>
              <td className="px-3 py-2">{order.color}</td>
            </tr>
            <tr>
              <td className="px-3 py-2 bg-gray-50 font-medium text-gray-600">Superficie</td>
              <td className="px-3 py-2">{area} m²</td>
              <td className="px-3 py-2 bg-gray-50 font-medium text-gray-600">Volumen</td>
              <td className="px-3 py-2">{volumen} m³</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Accesorios</h2>
        {order.accesorios.length > 0 ? (
          <ul className="list-disc list-inside text-sm space-y-1">
            {order.accesorios.map((oa) => (
              <li key={oa.id}>
                {oa.accesorio.name}
                {oa.accesorio.precio != null && (
                  <span className="text-gray-500"> — ${oa.accesorio.precio.toLocaleString("es-CL")}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">Sin accesorios</p>
        )}
      </section>

      {order.comentarios && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Comentarios</h2>
          <p className="text-sm text-gray-700 whitespace-pre-wrap border border-gray-100 rounded-lg p-3 bg-gray-50">
            {order.comentarios}
          </p>
        </section>
      )}

      {order.precioFinal != null && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Precio</h2>
          <p className="text-lg font-bold text-brand-blue">
            {order.precioFinal.toLocaleString("es-CL")} {order.moneda}
          </p>
        </section>
      )}

      <footer className="pt-6 border-t border-gray-200 text-xs text-gray-400 print:mt-8">
        Documento generado desde el panel administrativo · Piscinas Mundo Fibra
      </footer>
    </div>
  );
}
