export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse" aria-busy="true" aria-label="Cargando panel">
      <div className="h-8 bg-gray-200 rounded-lg w-64 max-w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-white rounded-2xl border border-gray-100 shadow-sm" />
        ))}
      </div>
      <div className="h-24 bg-gray-200/80 rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-white rounded-2xl border border-gray-100" />
        <div className="h-64 bg-white rounded-2xl border border-gray-100" />
      </div>
    </div>
  );
}
