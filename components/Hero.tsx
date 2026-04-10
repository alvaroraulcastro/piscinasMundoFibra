import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-pool">
      {/* Animated water wave shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-8 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 60C240 100 480 20 720 60C960 100 1200 20 1440 60V120H0V60Z"
              fill="white"
              fillOpacity="0.05"
            />
          </svg>
        </div>
        {/* Bubble decorations */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/10 animate-pulse"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              top: `${10 + i * 10}%`,
              left: `${5 + i * 12}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Logo symbol */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
            <svg
              viewBox="0 0 120 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-12"
            >
              <path
                d="M30 37.5C30 29.216 36.716 22.5 45 22.5C53.284 22.5 58.5 27.75 60 37.5C61.5 47.25 66.716 52.5 75 52.5C83.284 52.5 90 45.784 90 37.5C90 29.216 83.284 22.5 75 22.5C66.716 22.5 61.5 27.75 60 37.5C58.5 47.25 53.284 52.5 45 52.5C36.716 52.5 30 45.784 30 37.5Z"
                stroke="#00c8e0"
                strokeWidth="6"
                fill="none"
              />
            </svg>
          </div>
        </div>

        <p className="text-brand-cyan font-semibold text-lg tracking-widest uppercase mb-3">
          Mundo Fibra
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          Piscinas de
          <span className="block text-brand-cyan">Fibra de Vidrio</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
          Alta durabilidad, diseños exclusivos y la mejor tecnología multicapa.
          Tu piscina ideal a un clic de distancia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/#cotizador" className="btn-primary text-lg py-4 px-10">
            Cotizar mi piscina
          </a>
          <a href="/#ventajas" className="btn-secondary text-lg py-4 px-10">
            Conocer más
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { value: "6", label: "Colores disponibles" },
            { value: "100%", label: "Fibra de vidrio" },
            { value: "Garantía", label: "de calidad" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold text-brand-cyan">{stat.value}</div>
              <div className="text-white/70 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="/#ventajas"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white animate-bounce"
        aria-label="Desplazar hacia abajo"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
