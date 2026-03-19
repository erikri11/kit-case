import { API_BASE } from "@shared/config/api";

export function resolveImageUrl(url?: string | null): string {
  if (!url) return "";

  if (url.startsWith("blob:")) return url;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http")) return url;

  // Only backend-uploaded files should use API_BASE
  if (url.startsWith("/uploads/")) {
    return `${API_BASE}${url}`;
  }

  // Keep other relative paths as they are
  return url;
}
