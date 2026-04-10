import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Ventajas from "@/components/Ventajas";
import Tecnologia from "@/components/Tecnologia";
import Colores from "@/components/Colores";
import Cotizador from "@/components/Cotizador";
import Contacto from "@/components/Contacto";
import prisma from "@/lib/prisma";
import { getPublicCatalog } from "@/lib/catalog-public";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://piscinasmundofibra.cl";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoEntry.findUnique({ where: { pageSlug: "home" } });
  if (!seo) {
    return {};
  }
  const keywords = seo.keywords
    ? seo.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : undefined;

  return {
    title: seo.title,
    description: seo.description ?? undefined,
    keywords,
    openGraph: {
      type: "website",
      locale: "es_CL",
      url: SITE_URL,
      siteName: "Piscinas Mundo Fibra",
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description ?? undefined,
    },
  };
}

export default async function Home() {
  const catalog = await getPublicCatalog();

  return (
    <>
      <Hero />
      <Ventajas />
      <Tecnologia />
      <Colores colors={catalog.colors} />
      <Cotizador
        coloresDisponibles={catalog.coloresCotizador}
        accesoriosDisponibles={catalog.accesoriosCotizador}
      />
      <Contacto />
    </>
  );
}
