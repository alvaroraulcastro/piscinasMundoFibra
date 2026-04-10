"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, Search } from "lucide-react";

type SeoEntry = {
  id: string;
  pageSlug: string;
  title: string;
  description: string | null;
  keywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
};

export default function SeoClient({ entries }: { entries: SeoEntry[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<SeoEntry | null>(entries[0] ?? null);
  const [form, setForm] = useState<SeoEntry | null>(entries[0] ?? null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    router.refresh();
  };

  if (!form) {
    return <p className="text-gray-400">No hay entradas SEO configuradas.</p>;
  }

  const titleLen = form.title?.length ?? 0;
  const descLen = form.description?.length ?? 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar: pages */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Páginas</h3>
        <div className="space-y-1">
          {entries.map((e) => (
            <button
              key={e.id}
              onClick={() => { setSelected(e); setForm(e); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                selected?.id === e.id ? "bg-brand-cyan/10 text-brand-blue font-bold" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {e.pageSlug}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="lg:col-span-2 space-y-6">
        {/* Google Preview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Eye size={16} className="text-gray-400" />
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Previsualización en Google</h3>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-blue-700 text-lg font-medium leading-snug hover:underline cursor-pointer truncate">
              {form.title || "Título de la página"}
            </p>
            <p className="text-green-700 text-sm mt-0.5">piscinasmundofibra.cl/{form.pageSlug === "home" ? "" : form.pageSlug}</p>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {form.description || "Descripción de la página..."}
            </p>
          </div>
        </div>

        {/* Fields */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Search size={16} className="text-brand-cyan" />
            <h3 className="font-bold text-gray-900">Metadatos — {form.pageSlug}</h3>
          </div>

          <div>
            <div className="flex justify-between">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Título (title tag)</label>
              <span className={`text-xs ${titleLen > 60 ? "text-red-500" : "text-gray-400"}`}>{titleLen}/60</span>
            </div>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Descripción (meta description)</label>
              <span className={`text-xs ${descLen > 160 ? "text-red-500" : "text-gray-400"}`}>{descLen}/160</span>
            </div>
            <textarea
              value={form.description ?? ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Palabras clave (separadas por coma)</label>
            <input
              type="text"
              value={form.keywords ?? ""}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
            />
          </div>

          <hr className="border-gray-100" />
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Open Graph (redes sociales)</h4>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">OG Título</label>
            <input
              type="text"
              value={form.ogTitle ?? ""}
              onChange={(e) => setForm({ ...form, ogTitle: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">OG Descripción</label>
            <textarea
              value={form.ogDescription ?? ""}
              onChange={(e) => setForm({ ...form, ogDescription: e.target.value })}
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-brand-blue text-white font-medium py-2.5 px-6 rounded-xl text-sm hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              <Save size={14} />
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
