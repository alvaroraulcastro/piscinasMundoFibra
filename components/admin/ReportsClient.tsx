"use client";

import { ShoppingCart, Users, DollarSign, Download, TrendingUp } from "lucide-react";

type Props = {
  totalOrders: number;
  totalClients: number;
  totalRevenue: number;
  statusData: { status: string; label: string; count: number; color: string }[];
  monthly: { month: string; count: number; revenue: number }[];
  colorDistribution: Record<string, number>;
};

export default function ReportsClient({
  totalOrders,
  totalClients,
  totalRevenue,
  statusData,
  monthly,
  colorDistribution,
}: Props) {
  const handleExportCSV = () => {
    window.open("/api/admin/reports?format=csv", "_blank");
  };

  const maxMonthly = Math.max(...monthly.map((m) => m.count), 1);
  const maxColor = Math.max(...Object.values(colorDistribution), 1);

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <ShoppingCart className="text-white" size={20} />
            </div>
            <span className="text-gray-500 text-sm">Total órdenes</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{totalOrders}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <Users className="text-white" size={20} />
            </div>
            <span className="text-gray-500 text-sm">Clientes únicos</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{totalClients}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
              <DollarSign className="text-white" size={20} />
            </div>
            <span className="text-gray-500 text-sm">Ingresos cotizados</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">
            ${totalRevenue.toLocaleString("es-CL")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Por Estado</h2>
          <div className="space-y-3">
            {statusData.length === 0 && <p className="text-gray-400 text-sm italic">Sin datos</p>}
            {statusData.map((s) => (
              <div key={s.status} className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full w-32 text-center ${s.color}`}>
                  {s.label}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-brand-cyan h-3 rounded-full transition-all"
                    style={{ width: `${(s.count / totalOrders) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-700 w-8 text-right">{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Color Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Colores Más Cotizados</h2>
          <div className="space-y-3">
            {Object.keys(colorDistribution).length === 0 && <p className="text-gray-400 text-sm italic">Sin datos</p>}
            {Object.entries(colorDistribution)
              .sort(([, a], [, b]) => b - a)
              .map(([color, count]) => (
                <div key={color} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-32">{color}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-brand-blue h-3 rounded-full transition-all"
                      style={{ width: `${(count / maxColor) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-700 w-8 text-right">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Monthly */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-brand-cyan" />
            <h2 className="font-bold text-gray-900">Evolución Mensual</h2>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 text-sm font-medium text-brand-blue hover:text-brand-cyan transition-colors"
          >
            <Download size={16} />
            Exportar CSV
          </button>
        </div>
        {monthly.length === 0 ? (
          <p className="text-gray-400 text-sm italic">Sin datos aún</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex items-end gap-2 min-w-fit h-48">
              {monthly.map((m) => (
                <div key={m.month} className="flex flex-col items-center gap-1 flex-1 min-w-[60px]">
                  <span className="text-xs font-bold text-gray-700">{m.count}</span>
                  <div
                    className="w-full bg-brand-cyan/80 rounded-t-lg transition-all min-h-[4px]"
                    style={{ height: `${(m.count / maxMonthly) * 100}%` }}
                  />
                  <span className="text-[10px] text-gray-400 font-mono">{m.month}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
