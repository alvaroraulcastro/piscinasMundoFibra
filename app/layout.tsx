import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://piscinasmundofibra.cl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Piscinas Mundo Fibra | Piscinas de Fibra de Vidrio en Chile",
    template: "%s | Piscinas Mundo Fibra",
  },
  description:
    "Piscinas de fibra de vidrio de alta calidad en Chile. Alta durabilidad, fácil mantenimiento, tecnología multicapa y 6 colores disponibles. Cotiza online tu piscina al instante.",
  keywords: [
    "piscinas fibra de vidrio",
    "piscinas Chile",
    "piscina fibra de vidrio Chile",
    "mundo fibra piscinas",
    "piscinas fibra",
    "comprar piscina fibra vidrio",
    "cotizar piscina Chile",
    "piscina gelcoat",
    "piscinas instalacion rapida",
    "piscina fibra bajo mantenimiento",
    "piscinas piscinasmundofibra",
  ],

  authors: [{ name: "Piscinas Mundo Fibra", url: SITE_URL }],
  creator: "Piscinas Mundo Fibra",
  publisher: "Piscinas Mundo Fibra",

  alternates: {
    canonical: "/",
    languages: { "es-CL": "/" },
  },

  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    siteName: "Piscinas Mundo Fibra",
    title: "Piscinas Mundo Fibra | Piscinas de Fibra de Vidrio en Chile",
    description:
      "Las mejores piscinas de fibra de vidrio en Chile. Tecnología multicapa, 6 colores disponibles y cotizador online. Contáctanos por WhatsApp.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Piscinas Mundo Fibra | Piscinas de Fibra de Vidrio en Chile",
    description:
      "Las mejores piscinas de fibra de vidrio en Chile. Tecnología multicapa, 6 colores y cotizador online.",
    creator: "@piscinasmundofibra",
    site: "@piscinasmundofibra",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },

  category: "home improvement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <JsonLd />
        <Navbar />
        <main>{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
