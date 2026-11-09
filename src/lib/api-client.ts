export async function apiFetch<T>(
  input: string,
  init?: RequestInit
): Promise<{ ok: true; data: T } | { ok: false; error: string; issues?: Record<string, string[]> }> {
  const res = await fetch(input, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, error: json.error || "Request failed", issues: json.issues };
  }
  return { ok: true, data: json };
}