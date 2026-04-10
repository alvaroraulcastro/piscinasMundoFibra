/** Metadatos de UI para colores del catálogo (nombre coincide con seed / admin). */
export type ColorUi = {
  nombre: string;
  hex: string;
  gradient: string;
  textColor: string;
  border?: boolean;
};

const BY_NAME: Record<string, Omit<ColorUi, "nombre" | "hex">> = {
  Celeste: {
    gradient: "from-sky-300 to-sky-400",
    textColor: "text-sky-800",
  },
  "Azul Tahití": {
    gradient: "from-blue-500 to-blue-700",
    textColor: "text-blue-900",
  },
  "Verde Turquesa": {
    gradient: "from-teal-400 to-cyan-600",
    textColor: "text-teal-900",
  },
  Blanco: {
    gradient: "from-gray-100 to-gray-200",
    textColor: "text-gray-700",
    border: true,
  },
  "Gris Oscuro": {
    gradient: "from-gray-600 to-gray-800",
    textColor: "text-gray-900",
  },
  "Gris Claro": {
    gradient: "from-gray-300 to-gray-500",
    textColor: "text-gray-700",
  },
};

export function toColorUi(row: {
  name: string;
  hex: string;
  gradient?: string | null;
}): ColorUi {
  const preset = BY_NAME[row.name];
  const gradient =
    row.gradient?.trim() ||
    (preset?.gradient ?? "from-gray-400 to-gray-600");
  const textColor = preset?.textColor ?? "text-gray-800";
  const border = preset?.border;
  return {
    nombre: row.name,
    hex: row.hex,
    gradient,
    textColor,
    ...(border ? { border: true } : {}),
  };
}
