import { toColorUi, type ColorUi } from "@/lib/color-ui";

const STATIC_COLORS: ColorUi[] = [
  {
    nombre: "Celeste",
    hex: "#87CEEB",
    gradient: "from-sky-300 to-sky-400",
    textColor: "text-sky-800",
  },
  {
    nombre: "Azul Tahití",
    hex: "#0072B5",
    gradient: "from-blue-500 to-blue-700",
    textColor: "text-blue-900",
  },
  {
    nombre: "Verde Turquesa",
    hex: "#00CED1",
    gradient: "from-teal-400 to-cyan-600",
    textColor: "text-teal-900",
  },
  {
    nombre: "Blanco",
    hex: "#F8F9FA",
    gradient: "from-gray-100 to-gray-200",
    textColor: "text-gray-700",
    border: true,
  },
  {
    nombre: "Gris Oscuro",
    hex: "#555555",
    gradient: "from-gray-600 to-gray-800",
    textColor: "text-gray-900",
  },
  {
    nombre: "Gris Claro",
    hex: "#AAAAAA",
    gradient: "from-gray-300 to-gray-500",
    textColor: "text-gray-700",
  },
];

type Props = {
  /** Filas del catálogo (admin). Si está vacío se usan los colores estáticos por defecto. */
  colors?: { name: string; hex: string; gradient?: string | null }[];
};

export default function Colores({ colors }: Props) {
  const list: ColorUi[] =
    colors && colors.length > 0 ? colors.map((c) => toColorUi(c)) : STATIC_COLORS;

  return (
    <section id="colores" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Colores Disponibles</h2>
        <p className="section-subtitle">
          Elige el color que mejor se adapte a tu estilo y espacio. Variedad que se nota desde el primer chapuzón.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {list.map((color) => (
            <div key={color.nombre} className="flex flex-col items-center gap-3 group">
              <div
                className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${color.gradient} shadow-lg group-hover:scale-105 transition-transform duration-300 ${
                  color.border ? "border-2 border-gray-200" : ""
                }`}
                style={{
                  boxShadow: `0 8px 24px ${color.hex}55`,
                }}
              >
                <div className="w-full h-full flex items-end justify-center pb-4 opacity-20">
                  <svg viewBox="0 0 80 30" className="w-3/4">
                    <rect x="5" y="5" width="70" height="20" rx="4" fill="white" />
                  </svg>
                </div>
              </div>
              <span className={`font-bold text-sm text-center ${color.textColor}`}>{color.nombre}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-10">
          * Los colores pueden variar ligeramente según el monitor. Consulta muestras físicas con tu asesor.
        </p>
      </div>
    </section>
  );
}
