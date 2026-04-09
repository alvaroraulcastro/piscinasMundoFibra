import { MessageCircle, Phone } from "lucide-react";

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

export default function Contacto() {
  return (
    <section id="contacto" className="py-24 bg-brand-dark text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          ¿Tienes preguntas?
        </h2>
        <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
          Nuestro equipo está disponible para asesorarte en todo el proceso. Contáctanos directamente.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/5 hover:bg-green-500 border border-white/10 hover:border-green-400 rounded-2xl p-6 transition-all duration-300 flex flex-col items-center gap-4"
          >
            <div className="w-14 h-14 bg-green-500 group-hover:bg-white rounded-full flex items-center justify-center transition-colors">
              <MessageCircle className="text-white group-hover:text-green-500" size={28} />
            </div>
            <div>
              <p className="font-bold text-lg">WhatsApp</p>
              <p className="text-white/60 group-hover:text-white/80 text-sm mt-1 transition-colors">
                +56 9 5408 8120
              </p>
            </div>
          </a>

          <a
            href="tel:+56954088120"
            className="group bg-white/5 hover:bg-brand-cyan border border-white/10 hover:border-brand-cyan rounded-2xl p-6 transition-all duration-300 flex flex-col items-center gap-4"
          >
            <div className="w-14 h-14 bg-brand-cyan group-hover:bg-white rounded-full flex items-center justify-center transition-colors">
              <Phone className="text-white group-hover:text-brand-cyan" size={28} />
            </div>
            <div>
              <p className="font-bold text-lg">Teléfono</p>
              <p className="text-white/60 group-hover:text-white/80 text-sm mt-1 transition-colors">
                +56 9 5408 8120
              </p>
            </div>
          </a>

          <a
            href="https://www.instagram.com/piscinasmundofibra"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/5 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 border border-white/10 hover:border-pink-400 rounded-2xl p-6 transition-all duration-300 flex flex-col items-center gap-4"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <InstagramIcon className="text-white w-7 h-7" />
            </div>
            <div>
              <p className="font-bold text-lg">Instagram</p>
              <p className="text-white/60 group-hover:text-white/80 text-sm mt-1 transition-colors">
                @piscinasmundofibra
              </p>
            </div>
          </a>
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-green-500/40 text-lg"
        >
          <MessageCircle size={22} />
          Chatear por WhatsApp ahora
        </a>
      </div>
    </section>
  );
}
