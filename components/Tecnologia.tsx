const capas = [
  {
    nombre: "Gelcoat",
    descripcion: "Capa exterior de alta resistencia UV que protege el color y la superficie. Brillo duradero.",
    color: "from-cyan-400 to-cyan-600",
    textColor: "text-cyan-700",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-400",
    numero: "1",
  },
  {
    nombre: "Viniléster",
    descripcion: "Capa estructural corrosivo-resistente. Proporciona la rigidez y fortaleza principal de la piscina.",
    color: "from-blue-500 to-blue-700",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-500",
    numero: "2",
    badge: "Capa Estructural",
  },
  {
    nombre: "Viniléster",
    descripcion: "Primera capa de sellado. Bloquea la humedad y previene la ósmosis en la estructura.",
    color: "from-indigo-500 to-indigo-700",
    textColor: "text-indigo-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-500",
    numero: "3",
    badge: "Capa Sellado",
  },
  {
    nombre: "Viniléster",
    descripcion: "Segunda capa de sellado. Garantiza el aislamiento total y la durabilidad a largo plazo.",
    color: "from-brand-blue to-brand-dark",
    textColor: "text-brand-blue",
    bgColor: "bg-blue-50",
    borderColor: "border-brand-blue",
    numero: "4",
    badge: "Capa Sellado",
  },
];

export default function Tecnologia() {
  return (
    <section id="tecnologia" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Tecnología Multicapa en Fibra de Vidrio</h2>
        <p className="section-subtitle">
          La calidad de una piscina comienza por su estructura. Nuestro proceso de fabricación
          garantiza una piscina duradera con 4 capas de protección.
        </p>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Visual Stack */}
          <div className="flex-1 flex flex-col gap-3 w-full max-w-lg mx-auto">
            {capas.map((capa, i) => (
              <div
                key={i}
                className={`${capa.bgColor} border-l-4 ${capa.borderColor} rounded-r-xl px-6 py-4 flex items-center gap-4 shadow-sm`}
                style={{ marginLeft: `${i * 16}px` }}
              >
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${capa.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {capa.numero}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-bold ${capa.textColor}`}>{capa.nombre}</span>
                    {capa.badge && (
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r ${capa.color} text-white`}
                      >
                        {capa.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-0.5">{capa.descripcion}</p>
                </div>
              </div>
            ))}
            <div className="mt-4 bg-brand-dark/5 rounded-xl p-4 border border-brand-blue/20 text-center">
              <span className="text-brand-blue font-bold text-sm">
                ✓ Resultado: Una piscina duradera para toda la vida
              </span>
            </div>
          </div>

          {/* Info Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Sin ósmosis",
                desc: "Las capas de Viniléster crean una barrera impermeable que evita la entrada de humedad.",
                icon: "🛡️",
              },
              {
                title: "Resistencia química",
                desc: "El Viniléster resiste los productos químicos del agua como el cloro y el pH.",
                icon: "⚗️",
              },
              {
                title: "Brillo permanente",
                desc: "El Gelcoat mantiene el color y el brillo original por muchos años sin decolorarse.",
                icon: "✨",
              },
              {
                title: "Fabricación certificada",
                desc: "Proceso de fabricación controlado para asegurar el espesor y la uniformidad de cada capa.",
                icon: "🏆",
              },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-brand-blue mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
