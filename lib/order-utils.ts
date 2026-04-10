export function generateOrderNumber(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `PMF-${y}${m}${d}-${rand}`;
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  NUEVA: "Nueva",
  EN_REVISION: "En revisión",
  COTIZADA: "Cotizada",
  ACEPTADA: "Aceptada",
  RECHAZADA: "Rechazada",
  EN_FABRICACION: "En fabricación",
  LISTA_ENTREGA: "Lista para entrega",
  ENTREGADA: "Entregada",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  NUEVA: "bg-blue-100 text-blue-800",
  EN_REVISION: "bg-yellow-100 text-yellow-800",
  COTIZADA: "bg-purple-100 text-purple-800",
  ACEPTADA: "bg-green-100 text-green-800",
  RECHAZADA: "bg-red-100 text-red-800",
  EN_FABRICACION: "bg-cyan-100 text-cyan-800",
  LISTA_ENTREGA: "bg-indigo-100 text-indigo-800",
  ENTREGADA: "bg-emerald-100 text-emerald-800",
};

export const ORDER_STATUS_FLOW: Record<string, string[]> = {
  NUEVA: ["EN_REVISION", "RECHAZADA"],
  EN_REVISION: ["COTIZADA", "RECHAZADA"],
  COTIZADA: ["ACEPTADA", "RECHAZADA", "EN_REVISION"],
  ACEPTADA: ["EN_FABRICACION"],
  EN_FABRICACION: ["LISTA_ENTREGA"],
  LISTA_ENTREGA: ["ENTREGADA"],
  RECHAZADA: [],
  ENTREGADA: [],
};
