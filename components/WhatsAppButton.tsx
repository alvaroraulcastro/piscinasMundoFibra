"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "56954088120";
const WHATSAPP_MSG = encodeURIComponent(
  "Hola! Me gustaría recibir información sobre sus piscinas de fibra de vidrio."
);

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 print:hidden">
      {showTooltip && (
        <div className="bg-white text-gray-800 rounded-2xl shadow-xl px-4 py-3 max-w-xs flex items-start gap-2 animate-fade-in">
          <div className="flex-1">
            <p className="font-bold text-sm text-green-600">¿Tienes dudas?</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Escríbenos por WhatsApp, respondemos rápido.
            </p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-300 hover:text-gray-500 flex-shrink-0 mt-0.5"
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full shadow-lg hover:shadow-green-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="text-white" size={28} />
      </a>
    </div>
  );
}
