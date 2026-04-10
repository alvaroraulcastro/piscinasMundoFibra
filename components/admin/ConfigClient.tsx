"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Save, Phone, Mail, Globe, Layout, Type } from "lucide-react";

type Config = { id: string; key: string; value: string; label: string | null };

const SECTIONS: {
  title: string;
  icon: typeof Phone;
  keys: string[];
}[] = [
  { title: "Contacto", icon: Phone, keys: ["phone", "whatsapp_number", "email_contact", "instagram"] },
  { title: "Email SMTP", icon: Mail, keys: ["smtp_host", "smtp_port", "smtp_user", "smtp_pass", "smtp_from"] },
  { title: "Secciones Visibles", icon: Layout, keys: ["section_ventajas", "section_tecnologia", "section_colores", "section_cotizador", "section_contacto"] },
  { title: "Textos del Sitio", icon: Type, keys: ["site_name", "hero_title", "hero_subtitle"] },
];

export default function ConfigClient({ configs }: { configs: Config[] }) {
  const router = useRouter();
  const configMap: Record<string, Config> = {};
  configs.forEach((c) => (configMap[c.key] = c));

  const [values, setValues] = useState<Record<string, string>>(() => {
    const v: Record<string, string> = {};
    configs.forEach((c) => (v[c.key] = c.value));
    return v;
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const entries = Object.entries(values).map(([key, value]) => ({ key, value }));
      const res = await fetch("/api/admin/config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error || "Error al guardar");
      }
      toast.success("Configuración guardada");
      router.refresh();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const isBoolean = (key: string) => key.startsWith("section_");
  const isPassword = (key: string) => key === "smtp_pass";

  return (
    <div className="space-y-6">
      {SECTIONS.map((section) => {
        const Icon = section.icon;
        const sectionConfigs = section.keys.filter((k) => configMap[k]);
        if (sectionConfigs.length === 0) return null;
        return (
          <div key={section.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Icon size={18} className="text-brand-cyan" />
              <h2 className="font-bold text-gray-900">{section.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sectionConfigs.map((key) => {
                const cfg = configMap[key];
                if (!cfg) return null;
                if (isBoolean(key)) {
                  return (
                    <label key={key} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
                      <span className="text-sm text-gray-700 font-medium">{cfg.label ?? key}</span>
                      <input
                        type="checkbox"
                        checked={values[key] === "true"}
                        onChange={(e) => setValues({ ...values, [key]: e.target.checked ? "true" : "false" })}
                        className="accent-brand-cyan w-5 h-5"
                      />
                    </label>
                  );
                }
                return (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">{cfg.label ?? key}</label>
                    <input
                      type={isPassword(key) ? "password" : "text"}
                      value={values[key] ?? ""}
                      onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-brand-blue text-white font-bold py-3 px-8 rounded-xl text-sm hover:bg-brand-dark transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Guardando..." : "Guardar toda la configuración"}
        </button>
      </div>
    </div>
  );
}
