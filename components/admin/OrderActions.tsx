"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ORDER_STATUS_LABELS } from "@/lib/order-utils";

type Props = {
  orderId: string;
  orderNumber: string;
  clientName: string;
  clientPhone: string;
  /** Solo dígitos, sin + (ej. 56954088120). Viene de siteConfig o valor por defecto. */
  whatsappNumber: string;
  currentStatus: string;
  allowedTransitions: string[];
  sellers: { id: string; name: string }[];
  currentSellerId: string | null;
  currentPrice: number | null;
};

export default function OrderActions({
  orderId,
  orderNumber,
  clientName,
  clientPhone,
  whatsappNumber,
  currentStatus,
  allowedTransitions,
  sellers,
  currentSellerId,
  currentPrice,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [sellerId, setSellerId] = useState(currentSellerId ?? "");
  const [price, setPrice] = useState(currentPrice?.toString() ?? "");

  const waDigits = whatsappNumber.replace(/\D/g, "") || "56954088120";
  const whatsappHref = `https://wa.me/${waDigits}?text=${encodeURIComponent(
    `Hola, les escribo por la orden ${orderNumber}. Cliente: ${clientName}. Tel: ${clientPhone}.`
  )}`;

  const updateOrder = async (data: Record<string, unknown>) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al actualizar");
      }
      toast.success("Orden actualizada");
      router.refresh();
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (newStatus: string) => {
    updateOrder({ status: newStatus, comment: comment || undefined });
    setComment("");
  };

  const handleAssignSeller = () => {
    if (sellerId) updateOrder({ sellerId });
  };

  const handleSetPrice = () => {
    if (price) updateOrder({ precioFinal: price });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
      <h2 className="font-bold text-gray-900">Acciones</h2>

      {error && (
        <div className="bg-red-50 text-red-700 rounded-xl px-4 py-2 text-sm">{error}</div>
      )}

      {/* Status transitions */}
      {allowedTransitions.length > 0 && (
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
            Cambiar Estado
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comentario (opcional)"
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 resize-none"
          />
          <div className="flex flex-col gap-2">
            {allowedTransitions.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                disabled={loading}
                className="w-full text-left px-4 py-2.5 rounded-xl border border-gray-200 hover:border-brand-cyan hover:bg-brand-cyan/5 text-sm font-medium transition-colors disabled:opacity-50"
              >
                → {ORDER_STATUS_LABELS[status]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Assign seller */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
          Asignar Vendedor
        </label>
        <div className="flex gap-2">
          <select
            value={sellerId}
            onChange={(e) => setSellerId(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
          >
            <option value="">Sin asignar</option>
            {sellers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAssignSeller}
            disabled={loading || !sellerId}
            className="px-4 py-2.5 bg-brand-blue text-white rounded-xl text-sm font-medium hover:bg-brand-dark transition-colors disabled:opacity-50"
          >
            Asignar
          </button>
        </div>
      </div>

      {/* Price */}
      {["EN_REVISION", "COTIZADA"].includes(currentStatus) && (
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
            Precio Final (CLP)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ej: 3500000"
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
            />
            <button
              onClick={handleSetPrice}
              disabled={loading || !price}
              className="px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp — siempre al número de negocio configurado */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition-colors"
      >
        Contactar por WhatsApp
      </a>
    </div>
  );
}
