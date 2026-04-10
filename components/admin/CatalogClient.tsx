"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Palette, Package } from "lucide-react";

type Color = { id: string; name: string; hex: string; active: boolean };
type Accesorio = { id: string; name: string; slug: string; description: string | null; precio: number | null; active: boolean };
type Model = { id: string; name: string; slug: string; description: string | null; largo: number | null; ancho: number | null; profundidad: number | null; active: boolean };

export default function CatalogClient({
  colors,
  accesorios,
  models,
}: {
  colors: Color[];
  accesorios: Accesorio[];
  models: Model[];
}) {
  const [tab, setTab] = useState<"colors" | "accesorios" | "models">("colors");
  const tabs = [
    { key: "colors" as const, label: "Colores", icon: Palette, count: colors.length },
    { key: "accesorios" as const, label: "Accesorios", icon: Package, count: accesorios.length },
    { key: "models" as const, label: "Modelos", icon: Package, count: models.length },
  ];

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                tab === t.key ? "bg-brand-blue text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-brand-cyan"
              }`}
            >
              <Icon size={16} />
              {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? "bg-white/20" : "bg-gray-100"}`}>
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {tab === "colors" && <ColorsTable colors={colors} />}
      {tab === "accesorios" && <AccesoriosTable accesorios={accesorios} />}
      {tab === "models" && <ModelsTable models={models} />}
    </div>
  );
}

function ColorsTable({ colors }: { colors: Color[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", hex: "#0072B5" });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/catalog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "color", ...form }),
    });
    setShowForm(false);
    setForm({ name: "", hex: "#0072B5" });
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-brand-cyan text-white font-medium py-2 px-4 rounded-xl text-sm hover:bg-cyan-400 transition-colors">
          <Plus size={16} /> Agregar color
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl p-5 border border-gray-100 flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Nombre</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Color</label>
            <input type="color" value={form.hex} onChange={(e) => setForm({ ...form, hex: e.target.value })} className="w-12 h-10 rounded-lg cursor-pointer border-0" />
          </div>
          <button type="submit" className="bg-brand-blue text-white font-medium py-2 px-5 rounded-xl text-sm hover:bg-brand-dark transition-colors">Crear</button>
        </form>
      )}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 p-5">
          {colors.map((c) => (
            <div key={c.id} className="text-center">
              <div className="w-full aspect-square rounded-xl shadow-md mb-2" style={{ backgroundColor: c.hex }} />
              <p className="text-sm font-medium text-gray-700">{c.name}</p>
              <p className="text-xs text-gray-400">{c.hex}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccesoriosTable({ accesorios }: { accesorios: Accesorio[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", description: "", precio: "" });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/catalog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "accesorio", ...form, precio: form.precio ? parseFloat(form.precio) : null }),
    });
    setShowForm(false);
    setForm({ name: "", slug: "", description: "", precio: "" });
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-brand-cyan text-white font-medium py-2 px-4 rounded-xl text-sm hover:bg-cyan-400 transition-colors">
          <Plus size={16} /> Agregar accesorio
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl p-5 border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="text" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" required />
          <input type="text" placeholder="Slug (ej: bomba-calor)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" required />
          <input type="text" placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" />
          <input type="number" placeholder="Precio (CLP)" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" />
          <div className="sm:col-span-2 flex justify-end">
            <button type="submit" className="bg-brand-blue text-white font-medium py-2 px-5 rounded-xl text-sm hover:bg-brand-dark transition-colors">Crear</button>
          </div>
        </form>
      )}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider"><th className="px-5 py-3">Nombre</th><th className="px-5 py-3">Slug</th><th className="px-5 py-3">Descripción</th><th className="px-5 py-3">Precio</th><th className="px-5 py-3">Estado</th></tr></thead>
          <tbody className="divide-y divide-gray-50">
            {accesorios.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50/50"><td className="px-5 py-3 font-medium text-gray-900">{a.name}</td><td className="px-5 py-3 text-gray-400 font-mono text-xs">{a.slug}</td><td className="px-5 py-3 text-gray-600">{a.description ?? "—"}</td><td className="px-5 py-3 text-gray-600">{a.precio ? `$${a.precio.toLocaleString("es-CL")}` : "—"}</td><td className="px-5 py-3"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${a.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{a.active ? "Activo" : "Inactivo"}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ModelsTable({ models }: { models: Model[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", description: "", largo: "", ancho: "", profundidad: "" });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/catalog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "model",
        ...form,
        largo: form.largo ? parseFloat(form.largo) : null,
        ancho: form.ancho ? parseFloat(form.ancho) : null,
        profundidad: form.profundidad ? parseFloat(form.profundidad) : null,
      }),
    });
    setShowForm(false);
    setForm({ name: "", slug: "", description: "", largo: "", ancho: "", profundidad: "" });
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-brand-cyan text-white font-medium py-2 px-4 rounded-xl text-sm hover:bg-cyan-400 transition-colors">
          <Plus size={16} /> Agregar modelo
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl p-5 border border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input type="text" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" required />
          <input type="text" placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" required />
          <input type="text" placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" />
          <input type="number" step="0.1" placeholder="Largo (m)" value={form.largo} onChange={(e) => setForm({ ...form, largo: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" />
          <input type="number" step="0.1" placeholder="Ancho (m)" value={form.ancho} onChange={(e) => setForm({ ...form, ancho: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" />
          <input type="number" step="0.1" placeholder="Profundidad (m)" value={form.profundidad} onChange={(e) => setForm({ ...form, profundidad: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" />
          <div className="sm:col-span-3 flex justify-end">
            <button type="submit" className="bg-brand-blue text-white font-medium py-2 px-5 rounded-xl text-sm hover:bg-brand-dark transition-colors">Crear</button>
          </div>
        </form>
      )}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider"><th className="px-5 py-3">Modelo</th><th className="px-5 py-3">Dimensiones</th><th className="px-5 py-3">Descripción</th><th className="px-5 py-3">Estado</th></tr></thead>
          <tbody className="divide-y divide-gray-50">
            {models.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50/50"><td className="px-5 py-3 font-medium text-gray-900">{m.name}</td><td className="px-5 py-3 text-gray-600">{m.largo && m.ancho ? `${m.largo}×${m.ancho}${m.profundidad ? `×${m.profundidad}` : ""}m` : "—"}</td><td className="px-5 py-3 text-gray-600">{m.description ?? "—"}</td><td className="px-5 py-3"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${m.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{m.active ? "Activo" : "Inactivo"}</span></td></tr>
            ))}
            {models.length === 0 && <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-400 italic">Sin modelos registrados</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
