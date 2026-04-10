import prisma from "@/lib/prisma";

const FALLBACK_COLOR_NAMES = [
  "Celeste",
  "Azul Tahití",
  "Verde Turquesa",
  "Blanco",
  "Gris Oscuro",
  "Gris Claro",
];

export type CotizadorAccesorioItem = {
  id: string;
  label: string;
  descripcion: string;
};

const FALLBACK_ACCESORIOS: CotizadorAccesorioItem[] = [
  { id: "bomba-calor", label: "Bomba de calefacción Aquark", descripcion: "Calienta el agua todo el año" },
  { id: "filtro", label: "Sistema de filtración", descripcion: "Arena o cartucho de alta eficiencia" },
  { id: "escalera", label: "Escalera inox", descripcion: "Escalera de acero inoxidable" },
  { id: "cobertor", label: "Cobertor de seguridad", descripcion: "Cobertor isotérmico y de seguridad" },
  { id: "iluminacion", label: "Iluminación LED", descripcion: "Luz sumergible multicolor" },
  { id: "robot-limpiador", label: "Robot limpiador", descripcion: "Limpieza automática del fondo" },
];

export async function getPublicCatalog(): Promise<{
  colors: { name: string; hex: string; gradient: string | null }[];
  coloresCotizador: string[];
  accesoriosCotizador: CotizadorAccesorioItem[];
}> {
  const [colorRows, accRows] = await Promise.all([
    prisma.color.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.accesorio.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  const colors = colorRows.map((c) => ({
    name: c.name,
    hex: c.hex,
    gradient: c.gradient,
  }));

  const coloresCotizador =
    colorRows.length > 0 ? colorRows.map((c) => c.name) : FALLBACK_COLOR_NAMES;

  const accesoriosCotizador: CotizadorAccesorioItem[] =
    accRows.length > 0
      ? accRows.map((a) => ({
          id: a.slug,
          label: a.name,
          descripcion: a.description ?? "",
        }))
      : FALLBACK_ACCESORIOS;

  return { colors, coloresCotizador, accesoriosCotizador };
}
