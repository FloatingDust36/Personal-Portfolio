// Best-effort in-memory rate limit by IP. On serverless this is per-instance,
// not global — a basic guard against abuse of a public model endpoint, not a
// hard quota.

const hits = new Map<string, number[]>();

export function rateLimit(
  ip: string,
  limit = 8,
  windowMs = 60_000,
): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    const retryAfter = Math.ceil((windowMs - (now - recent[0])) / 1000);
    return { ok: false, retryAfter };
  }
  recent.push(now);
  hits.set(ip, recent);
  // Opportunistic cleanup so the map does not grow unbounded.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t > windowMs)) hits.delete(key);
    }
  }
  return { ok: true };
}
