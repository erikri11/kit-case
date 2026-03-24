import { API_BASE, API_PREFIX } from "@shared/config/api";

export async function makeRequest<T>(
  path: string, 
  options?: RequestInit
): Promise<T> {

  const method = (options?.method ?? "GET").toUpperCase();
  const headers = new Headers(options?.headers);

  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  const result = await fetch(`${API_BASE}${API_PREFIX}${path}`, {
    ...options,
    method: method,
    headers: headers
  });

  if (!result.ok) {
    const text = await result.text().catch(() => "");
    throw new Error(`${result.status} ${result.statusText}${text ? ` - ${text}` : ""}`);
  };

  // No Content - response have no body
  if (result.status === 204) return undefined as T;

  return result.json() as Promise<T>;
}
