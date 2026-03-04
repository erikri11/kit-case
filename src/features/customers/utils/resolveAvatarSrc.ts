const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

export function resolveAvatarSrc(avatarUrl: string | null | undefined) {
  if (!avatarUrl) return undefined;

  // already absolute
  if (avatarUrl.startsWith("http://") || avatarUrl.startsWith("https://")) return avatarUrl;

  // backend relative path -> make absolute
  if (avatarUrl.startsWith("/uploads/")) return `${API_BASE}${avatarUrl}`;

  return avatarUrl;
}
