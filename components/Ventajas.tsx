import {
  Shield,
  Wrench,
  CloudSun,
  Zap,
  Palette,
  Sun,
  Droplets,
  Wind,
} from "lucide-react";

const ventajas = [
  {
    icon: Shield,
    title: "Alta durabilidad y resistencia",
    description:
      "Estructura robusta que soporta años de uso sin deterioro, manteniendo su forma y color.",
  },
  {
    icon: Wrench,
    title: "Fácil mantenimiento",
    description:
      "Material no corrosivo que facilita la limpieza y reduce los costos de mantención.",
  },
  {
    icon: CloudSun,
    title: "Climáticamente resistentes",
    description:
      "Diseñadas para soportar todo tipo de climas, desde el frío del sur hasta el calor del norte.",
  },
  {
    icon: Zap,
    title: "Instalación rápida",
    description:
      "Fabricadas de una sola pieza para una instalación ágil y sin complicaciones.",
  },
  {
    icon: Palette,
    title: "Diseños variados y estéticos",
    description:
      "Amplia variedad de modelos y colores para adaptarse a cualquier espacio y estilo.",
  },
  {
    icon: Sun,
    title: "Protección contra rayos UV",
    description:
      "El Gelcoat exterior protege la estructura de la radiación solar, preservando el color y la integridad.",
  },
  {
    icon: Droplets,
    title: "Sin hongos ni algas",
    description:
      "La superficie lisa del Gelcoat dificulta la adherencia de hongos y algas.",
  },
  {
    icon: Wind,
    title: "Resistencia atmosférica",
    description:
      "Material que resiste las agresiones del ambiente, el viento y la humedad exterior.",
  },
];

export default function Ventajas() {
  return (
    <section id="ventajas" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Ventajas de las Piscinas de Fibra de Vidrio</h2>
        <p className="section-subtitle">
          Invierte en calidad, durabilidad y diseño con la mejor tecnología del mercado.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ventajas.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="card p-6 flex flex-col items-start gap-4 group hover:bg-brand-blue transition-colors duration-300"
              >
                <div className="bg-brand-cyan/10 group-hover:bg-white/10 rounded-xl p-3 transition-colors">
                  <Icon
                    className="text-brand-cyan group-hover:text-white transition-colors"
                    size={28}
                  />
                </div>
                <h3 className="font-bold text-brand-blue group-hover:text-white text-base leading-snug transition-colors">
                  {v.title}
                </h3>
                <p className="text-gray-500 group-hover:text-white/70 text-sm leading-relaxed transition-colors">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
