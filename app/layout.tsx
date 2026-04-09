import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Piscinas Mundo Fibra | Piscinas de Fibra de Vidrio en Chile",
  description:
    "Piscinas de fibra de vidrio de alta calidad. Alta durabilidad, fácil mantenimiento, instalación rápida. Cotiza tu piscina online y recibe tu orden de compra.",
  keywords: ["piscinas fibra de vidrio", "piscinas Chile", "piscina fibra", "mundo fibra"],
  openGraph: {
    title: "Piscinas Mundo Fibra",
    description: "Las mejores piscinas de fibra de vidrio en Chile. Cotiza ahora.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
