"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Save, Info } from "lucide-react";

type Template = {
  id: string;
  slug: string;
  name: string;
  subject: string;
  body: string;
  variables: string | null;
  active: boolean;
};

export default function EmailClient({ templates }: { templates: Template[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Template>>({});
  const [saving, setSaving] = useState(false);

  const startEdit = (t: Template) => {
    setEditing(t.id);
    setForm({ ...t });
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    await fetch("/api/admin/email-templates", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setEditing(null);
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {templates.map((t) => (
        <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div
            className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
            onClick={() => (editing === t.id ? setEditing(null) : startEdit(t))}
          >
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-brand-cyan" />
              <div>
                <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs font-mono">{t.slug}</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {t.active ? "Activo" : "Inactivo"}
            </span>
          </div>

          {editing === t.id && (
            <div className="px-6 pb-5 space-y-4 border-t border-gray-100 pt-4">
              {t.variables && (
                <div className="flex items-start gap-2 bg-blue-50 text-blue-700 rounded-xl px-4 py-3 text-xs">
                  <Info size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Variables disponibles: <code className="font-mono">{t.variables.split(",").map((v) => `{{${v}}}`).join(", ")}</code></span>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Asunto</label>
                <input
                  type="text"
                  value={form.subject ?? ""}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Cuerpo del email</label>
                <textarea
                  value={form.body ?? ""}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  rows={8}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 resize-y"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.active ?? true}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    className="accent-brand-cyan w-4 h-4"
                  />
                  Plantilla activa
                </label>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-brand-blue text-white font-medium py-2 px-5 rounded-xl text-sm hover:bg-brand-dark transition-colors disabled:opacity-50"
                >
                  <Save size={14} />
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
