"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#ventajas", label: "Ventajas" },
  { href: "#tecnologia", label: "Tecnología" },
  { href: "#colores", label: "Colores" },
  { href: "#cotizador", label: "Cotizar" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-brand-dark shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <LogoIcon className="w-10 h-10" />
            <span className="text-white font-extrabold text-xl leading-tight">
              Piscinas<br />
              <span className="text-brand-cyan">Mundo Fibra</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-brand-cyan font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cotizador"
              className="btn-primary text-sm py-2 px-6 inline-block"
            >
              Cotizar ahora
            </a>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-white/10 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-brand-cyan font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cotizador"
              className="btn-primary text-center text-sm py-2 px-6"
              onClick={() => setIsOpen(false)}
            >
              Cotizar ahora
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 25C20 19.477 24.477 15 30 15C35.523 15 39 18.5 40 25C41 31.5 44.477 35 50 35C55.523 35 60 30.523 60 25C60 19.477 55.523 15 50 15C44.477 15 41 18.5 40 25C39 31.5 35.523 35 30 35C24.477 35 20 30.523 20 25Z"
        stroke="#00c8e0"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
}
