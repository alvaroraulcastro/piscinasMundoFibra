/** Construye la query string para listado de órdenes (codificación correcta). */
export function ordersListQuery(page: number, status?: string, search?: string): string {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (status) params.set("status", status);
  if (search?.trim()) params.set("search", search.trim());
  const q = params.toString();
  return q ? `?${q}` : "";
}
