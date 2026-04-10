"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

type Props = {
  orderId: string;
};

export default function OrderPrintToolbar({ orderId }: Props) {
  return (
    <div className="print:hidden flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-gray-200">
      <Link
        href={`/admin/orders/${orderId}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue hover:text-brand-dark"
      >
        <ArrowLeft size={18} />
        Volver al detalle
      </Link>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue text-white text-sm font-medium hover:bg-brand-dark transition-colors"
      >
        <Printer size={18} />
        Imprimir o guardar como PDF
      </button>
    </div>
  );
}
