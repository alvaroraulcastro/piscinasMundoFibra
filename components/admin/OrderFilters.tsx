"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ORDER_STATUS_LABELS } from "@/lib/order-utils";
import { Search, Filter, X } from "lucide-react";

export default function OrderFilters({
  currentStatus,
  currentSearch,
}: {
  currentStatus?: string;
  currentSearch?: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch ?? "");

  useEffect(() => {
    setSearch(currentSearch ?? "");
  }, [currentSearch]);

  const hasFilters = Boolean(currentStatus || (currentSearch && currentSearch.length > 0));

  const pushWithParams = (status: string | undefined, q: string) => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("search", q.trim());
    if (status) params.set("status", status);
    const qs = params.toString();
    router.push(qs ? `/admin/orders?${qs}` : "/admin/orders");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    pushWithParams(currentStatus, search);
  };

  const handleStatusChange = (status: string) => {
    pushWithParams(status || undefined, search);
  };

  const clearFilters = () => {
    setSearch("");
    router.push("/admin/orders");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1 min-w-0">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              aria-hidden
            />
            <input
              type="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por número de orden, nombre o email…"
              autoComplete="off"
              aria-label="Buscar órdenes"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-brand-blue text-white text-sm font-medium hover:bg-brand-dark transition-colors shrink-0"
          >
            Buscar
          </button>
        </form>
        <div className="relative sm:w-56 shrink-0">
          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            aria-hidden
          />
          <select
            value={currentStatus ?? ""}
            onChange={(e) => handleStatusChange(e.target.value)}
            aria-label="Filtrar por estado"
            className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 appearance-none cursor-pointer"
          >
            <option value="">Todos los estados</option>
            {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:text-brand-dark"
          >
            <X size={16} />
            Limpiar filtros
          </button>
          <span className="text-xs text-gray-400">
            Mostrando resultados filtrados. Usa “Limpiar” para ver todas las órdenes.
          </span>
        </div>
      )}
    </div>
  );
}
