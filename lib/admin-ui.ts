/** Título corto para la barra móvil y metadatos según la ruta del panel. */
export function adminSectionTitle(pathname: string): string {
  if (pathname === "/admin") return "Inicio";
  if (pathname === "/admin/orders") return "Órdenes";
  if (pathname.startsWith("/admin/orders/")) {
    if (pathname.endsWith("/print")) return "Imprimir orden";
    return "Detalle de orden";
  }
  if (pathname === "/admin/users") return "Usuarios";
  if (pathname === "/admin/catalog") return "Catálogo";
  if (pathname === "/admin/email") return "Correo";
  if (pathname === "/admin/seo") return "SEO";
  if (pathname === "/admin/config") return "Configuración";
  if (pathname === "/admin/reports") return "Reportes";
  return "Administración";
}
