"use client";

import { useState } from "react";
import OrdenCompra from "./OrdenCompra";

export type CotizacionData = {
  nombre: string;
  email: string;
  telefono: string;
  largo: string;
  ancho: string;
  profundidad: string;
  color: string;
  accesorios: string[];
  comentarios: string;
};

const coloresDisponibles = [
  "Celeste",
  "Azul Tahití",
  "Verde Turquesa",
  "Blanco",
  "Gris Oscuro",
  "Gris Claro",
];

const accesoriosDisponibles = [
  { id: "bomba_calor", label: "Bomba de calefacción Aquark", descripcion: "Calienta el agua todo el año" },
  { id: "filtro", label: "Sistema de filtración", descripcion: "Arena o cartucho de alta eficiencia" },
  { id: "escalera", label: "Escalera inox", descripcion: "Escalera de acero inoxidable" },
  { id: "cobertor", label: "Cobertor de seguridad", descripcion: "Cobertor isotérmico y de seguridad" },
  { id: "iluminacion", label: "Iluminación LED", descripcion: "Luz sumergible multicolor" },
  { id: "robotlimpiador", label: "Robot limpiador", descripcion: "Limpieza automática del fondo" },
];

const WHATSAPP_NUMBER = "56954088120";

function buildWhatsAppMessage(data: CotizacionData): string {
  const accs = data.accesorios.length
    ? data.accesorios.join(", ")
    : "Ninguno";
  return encodeURIComponent(
    `Hola! Quiero cotizar una piscina de fibra de vidrio 🏊\n\n` +
    `*Datos de contacto:*\n` +
    `• Nombre: ${data.nombre}\n` +
    `• Email: ${data.email}\n` +
    `• Teléfono: ${data.telefono}\n\n` +
    `*Especificaciones:*\n` +
    `• Largo: ${data.largo} m\n` +
    `• Ancho: ${data.ancho} m\n` +
    `• Profundidad: ${data.profundidad} m\n` +
    `• Color: ${data.color}\n` +
    `• Accesorios: ${accs}\n\n` +
    `${data.comentarios ? `*Comentarios:* ${data.comentarios}\n\n` : ""}` +
    `Por favor envíenme la cotización. ¡Gracias!`
  );
}

export default function Cotizador() {
  const [form, setForm] = useState<CotizacionData>({
    nombre: "",
    email: "",
    telefono: "",
    largo: "",
    ancho: "",
    profundidad: "",
    color: "",
    accesorios: [],
    comentarios: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<CotizacionData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<CotizacionData> = {};
    if (!form.nombre.trim()) newErrors.nombre = "Requerido";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email inválido";
    if (!form.telefono.trim()) newErrors.telefono = "Requerido";
    if (!form.largo || isNaN(Number(form.largo)) || Number(form.largo) <= 0)
      newErrors.largo = "Ingrese un largo válido";
    if (!form.ancho || isNaN(Number(form.ancho)) || Number(form.ancho) <= 0)
      newErrors.ancho = "Ingrese un ancho válido";
    if (!form.profundidad || isNaN(Number(form.profundidad)) || Number(form.profundidad) <= 0)
      newErrors.profundidad = "Ingrese una profundidad válida";
    if (!form.color) newErrors.color = "Seleccione un color";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleAccesorio = (id: string) => {
    setForm((prev) => ({
      ...prev,
      accesorios: prev.accesorios.includes(id)
        ? prev.accesorios.filter((a) => a !== id)
        : [...prev.accesorios, id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleWhatsApp = () => {
    const msg = buildWhatsAppMessage(form);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({
      nombre: "",
      email: "",
      telefono: "",
      largo: "",
      ancho: "",
      profundidad: "",
      color: "",
      accesorios: [],
      comentarios: "",
    });
  };

  if (submitted) {
    return (
      <OrdenCompra
        data={form}
        onWhatsApp={handleWhatsApp}
        onReset={handleReset}
      />
    );
  }

  return (
    <section id="cotizador" className="py-24 bg-gradient-to-br from-brand-dark via-brand-blue to-brand-cyan">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-3">
          Cotiza tu Piscina
        </h2>
        <p className="text-white/70 text-center mb-10 max-w-xl mx-auto">
          Completa el formulario y genera tu orden de compra al instante. Te contactaremos con la cotización final.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 space-y-8"
        >
          {/* Datos de contacto */}
          <div>
            <h3 className="text-lg font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">
              Datos de contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Nombre completo"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                error={errors.nombre}
                placeholder="Juan Pérez"
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="juan@email.com"
              />
              <FormField
                label="Teléfono / WhatsApp"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                error={errors.telefono}
                placeholder="+56 9 XXXX XXXX"
              />
            </div>
          </div>

          {/* Dimensiones */}
          <div>
            <h3 className="text-lg font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">
              Dimensiones de la piscina
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Largo (metros)"
                name="largo"
                type="number"
                value={form.largo}
                onChange={handleChange}
                error={errors.largo}
                placeholder="Ej: 8"
                min="1"
                step="0.1"
              />
              <FormField
                label="Ancho (metros)"
                name="ancho"
                type="number"
                value={form.ancho}
                onChange={handleChange}
                error={errors.ancho}
                placeholder="Ej: 4"
                min="1"
                step="0.1"
              />
              <FormField
                label="Profundidad (metros)"
                name="profundidad"
                type="number"
                value={form.profundidad}
                onChange={handleChange}
                error={errors.profundidad}
                placeholder="Ej: 1.5"
                min="0.5"
                step="0.1"
              />
            </div>
            {form.largo && form.ancho && (
              <p className="text-sm text-brand-cyan font-medium mt-2">
                Área de superficie: {(Number(form.largo) * Number(form.ancho)).toFixed(1)} m²
              </p>
            )}
          </div>

          {/* Color */}
          <div>
            <h3 className="text-lg font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">
              Color de la piscina
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {coloresDisponibles.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => {
                    setForm((prev) => ({ ...prev, color: c }));
                    setErrors((prev) => ({ ...prev, color: undefined }));
                  }}
                  className={`py-2 px-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    form.color === c
                      ? "border-brand-cyan bg-brand-cyan/10 text-brand-blue"
                      : "border-gray-200 hover:border-brand-cyan/50 text-gray-600"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            {errors.color && (
              <p className="text-red-500 text-sm mt-1">{errors.color}</p>
            )}
          </div>

          {/* Accesorios */}
          <div>
            <h3 className="text-lg font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">
              Accesorios (opcional)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {accesoriosDisponibles.map((acc) => (
                <label
                  key={acc.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    form.accesorios.includes(acc.id)
                      ? "border-brand-cyan bg-brand-cyan/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.accesorios.includes(acc.id)}
                    onChange={() => handleAccesorio(acc.id)}
                    className="mt-0.5 accent-brand-cyan w-4 h-4 flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium text-sm text-gray-800">{acc.label}</p>
                    <p className="text-xs text-gray-500">{acc.descripcion}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Comentarios */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Comentarios adicionales (opcional)
            </label>
            <textarea
              name="comentarios"
              value={form.comentarios}
              onChange={handleChange}
              rows={3}
              placeholder="Cuéntanos más sobre tu proyecto, ubicación, preferencias especiales..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary text-lg py-4"
          >
            Generar Orden de Compra
          </button>
        </form>
      </div>
    </section>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  min?: string;
  step?: string;
};

function FormField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  min,
  step,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        step={step}
        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-400 focus:ring-red-200"
            : "border-gray-200 focus:ring-brand-cyan/50"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
