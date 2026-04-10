"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email o contraseña incorrectos");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-pool px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <svg viewBox="0 0 120 75" fill="none" className="w-16 h-10 mx-auto mb-4" aria-hidden>
            <path
              d="M30 37.5C30 29.216 36.716 22.5 45 22.5C53.284 22.5 58.5 27.75 60 37.5C61.5 47.25 66.716 52.5 75 52.5C83.284 52.5 90 45.784 90 37.5C90 29.216 83.284 22.5 75 22.5C66.716 22.5 61.5 27.75 60 37.5C58.5 47.25 53.284 52.5 45 52.5C36.716 52.5 30 45.784 30 37.5Z"
              stroke="#00c8e0"
              strokeWidth="6"
              fill="none"
            />
          </svg>
          <h1 className="text-2xl font-extrabold text-white">Panel de administración</h1>
          <p className="text-white/60 text-sm mt-1">Piscinas Mundo Fibra</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-5"
          noValidate
        >
          {error && (
            <div role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="admin-email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
              placeholder="tu@email.com"
              autoComplete="username"
              autoFocus
              required
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-semibold text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Ingresando…" : "Ingresar"}
          </button>
        </form>

        <p className="text-center text-white/40 text-xs mt-6">
          ¿Problemas para entrar? Comprueba mayúsculas y que el usuario esté activo.
        </p>
      </div>
    </div>
  );
}
