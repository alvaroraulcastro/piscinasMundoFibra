import { MessageCircle } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const WHATSAPP_NUMBER = "56954088120";
const WHATSAPP_MSG = encodeURIComponent(
  "Hola! Me gustaría recibir información sobre sus piscinas de fibra de vidrio."
);

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <svg viewBox="0 0 80 50" fill="none" className="w-10 h-7">
                <path
                  d="M20 25C20 19.477 24.477 15 30 15C35.523 15 39 18.5 40 25C41 31.5 44.477 35 50 35C55.523 35 60 30.523 60 25C60 19.477 55.523 15 50 15C44.477 15 41 18.5 40 25C39 31.5 35.523 35 30 35C24.477 35 20 30.523 20 25Z"
                  stroke="#00c8e0"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
              <div>
                <p className="font-extrabold text-white">Piscinas Mundo Fibra</p>
                <p className="text-brand-cyan text-xs">piscinasmundofibra</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Las mejores piscinas de fibra de vidrio con tecnología multicapa, diseños variados y garantía de calidad.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Navegación</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[
                { href: "/#ventajas", label: "Ventajas" },
                { href: "/#tecnologia", label: "Tecnología" },
                { href: "/#colores", label: "Colores" },
                { href: "/#cotizador", label: "Cotizador" },
                { href: "/#contacto", label: "Contacto" },
                { href: "/admin", label: "Administración" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-brand-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Contacto</h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/50 hover:text-green-400 transition-colors text-sm"
              >
                <MessageCircle size={16} />
                +56 9 5408 8120
              </a>
              <a
                href="https://www.instagram.com/piscinasmundofibra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/50 hover:text-pink-400 transition-colors text-sm"
              >
                <InstagramIcon className="w-4 h-4" />
                @piscinasmundofibra
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Piscinas Mundo Fibra. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ en Chile 🇨🇱</p>
        </div>
      </div>
    </footer>
  );
}
