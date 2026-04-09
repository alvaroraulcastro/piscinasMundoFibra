"use client";

import { useEffect, useRef } from "react";
import type { CotizacionData } from "./Cotizador";
import { CheckCircle, Download, MessageCircle, RotateCcw } from "lucide-react";

const accesoriosMap: Record<string, string> = {
  bomba_calor: "Bomba de calefacción Aquark",
  filtro: "Sistema de filtración",
  escalera: "Escalera inox",
  cobertor: "Cobertor de seguridad",
  iluminacion: "Iluminación LED",
  robotlimpiador: "Robot limpiador",
};

type Props = {
  data: CotizacionData;
  onWhatsApp: () => void;
  onReset: () => void;
};

function generateOrderNumber(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `PMF-${y}${m}${d}-${rand}`;
}

export default function OrdenCompra({ data, onWhatsApp, onReset }: Props) {
  const orderNumber = useRef(generateOrderNumber());
  const fecha = new Date().toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const volumen = (
    Number(data.largo) * Number(data.ancho) * Number(data.profundidad)
  ).toFixed(1);

  const area = (Number(data.largo) * Number(data.ancho)).toFixed(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="cotizador" className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success header */}
        <div className="text-center mb-8">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={56} />
          <h2 className="text-3xl font-extrabold text-brand-blue mb-2">
            ¡Orden de Compra Generada!
          </h2>
          <p className="text-gray-500">
            A continuación encontrarás el resumen de tu cotización. Envíala por WhatsApp para coordinar los detalles.
          </p>
        </div>

        {/* Orden de compra card */}
        <div
          id="orden-compra"
          className="bg-white rounded-3xl shadow-xl overflow-hidden print:shadow-none"
        >
          {/* Header */}
          <div className="bg-gradient-pool px-8 py-6 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <svg viewBox="0 0 80 50" fill="none" className="w-10 h-7">
                  <path
                    d="M20 25C20 19.477 24.477 15 30 15C35.523 15 39 18.5 40 25C41 31.5 44.477 35 50 35C55.523 35 60 30.523 60 25C60 19.477 55.523 15 50 15C44.477 15 41 18.5 40 25C39 31.5 35.523 35 30 35C24.477 35 20 30.523 20 25Z"
                    stroke="#00c8e0"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
                <div>
                  <p className="text-white font-extrabold text-lg leading-none">
                    Piscinas Mundo Fibra
                  </p>
                  <p className="text-brand-cyan text-xs">piscinasmundofibra</p>
                </div>
              </div>
              <p className="text-white/70 text-sm">WhatsApp: +56 9 5408 8120</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-lg">ORDEN DE COTIZACIÓN</p>
              <p className="text-brand-cyan font-mono text-sm mt-1">{orderNumber.current}</p>
              <p className="text-white/60 text-xs mt-1">{fecha}</p>
            </div>
          </div>

          <div className="px-8 py-6 space-y-6">
            {/* Cliente */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Datos del Cliente
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InfoItem label="Nombre" value={data.nombre} />
                <InfoItem label="Email" value={data.email} />
                <InfoItem label="Teléfono" value={data.telefono} />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Especificaciones */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Especificaciones de la Piscina
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <InfoItem label="Largo" value={`${data.largo} m`} highlight />
                <InfoItem label="Ancho" value={`${data.ancho} m`} highlight />
                <InfoItem label="Profundidad" value={`${data.profundidad} m`} highlight />
                <InfoItem label="Color" value={data.color} highlight />
              </div>
            </div>

            {/* Cálculos */}
            <div className="bg-brand-cyan/5 rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-brand-blue font-extrabold text-2xl">{area} m²</p>
                <p className="text-gray-500 text-xs mt-1">Área de superficie</p>
              </div>
              <div className="text-center">
                <p className="text-brand-blue font-extrabold text-2xl">{volumen} m³</p>
                <p className="text-gray-500 text-xs mt-1">Volumen de agua</p>
              </div>
              <div className="text-center sm:col-span-1 col-span-2">
                <p className="text-brand-blue font-extrabold text-2xl">
                  {Math.round(Number(volumen) * 1000).toLocaleString("es-CL")} L
                </p>
                <p className="text-gray-500 text-xs mt-1">Litros aprox.</p>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Accesorios */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Accesorios Solicitados
              </h3>
              {data.accesorios.length > 0 ? (
                <ul className="space-y-2">
                  {data.accesorios.map((acc) => (
                    <li key={acc} className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-brand-cyan rounded-full flex-shrink-0" />
                      {accesoriosMap[acc] ?? acc}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm italic">Sin accesorios adicionales.</p>
              )}
            </div>

            {data.comentarios && (
              <>
                <hr className="border-gray-100" />
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Comentarios
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-xl p-4">
                    {data.comentarios}
                  </p>
                </div>
              </>
            )}

            <hr className="border-gray-100" />

            {/* Nota */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
              <strong>Importante:</strong> Esta es una orden de cotización preliminar. El precio final será
              confirmado por nuestro equipo una vez revisadas las especificaciones y disponibilidad. Contáctenos
              por WhatsApp para continuar el proceso.
            </div>
          </div>

          {/* Footer de la orden */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Piscinas Mundo Fibra · @piscinasmundofibra</span>
            <span>{orderNumber.current}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 print:hidden">
          <button
            onClick={onWhatsApp}
            className="flex-1 flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-colors shadow-lg"
          >
            <MessageCircle size={22} />
            Enviar por WhatsApp
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-3 bg-brand-blue hover:bg-brand-dark text-white font-bold py-4 px-6 rounded-2xl transition-colors"
          >
            <Download size={22} />
            Descargar / Imprimir
          </button>
          <button
            onClick={onReset}
            className="sm:flex-none flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 text-gray-500 font-semibold py-4 px-6 rounded-2xl transition-colors"
          >
            <RotateCcw size={18} />
            Nueva cotización
          </button>
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={highlight ? "bg-brand-blue/5 rounded-xl p-3" : ""}>
      <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
      <p className="font-bold text-gray-800 text-sm">{value}</p>
    </div>
  );
}
