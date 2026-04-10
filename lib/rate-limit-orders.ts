/** Ventana deslizante en memoria (suficiente para una instancia; en serverless cada función tiene su propio mapa). */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

const hits = new Map<string, number[]>();

export function rateLimitOrders(key: string): boolean {
  const now = Date.now();
  const prev = hits.get(key) ?? [];
  const recent = prev.filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return false;
  recent.push(now);
  hits.set(key, recent);
  return true;
}
