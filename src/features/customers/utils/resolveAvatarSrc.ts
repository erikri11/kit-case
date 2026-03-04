import { API_BASE } from "@shared/config/api";

export function resolveAvatarSrc(avatarUrl: string | null | undefined) {
  if (!avatarUrl) return undefined;

  // Absolute URL (external or from backend)
  if (avatarUrl.startsWith("http://") || avatarUrl.startsWith("https://")) return avatarUrl;

  // Relative URL from backend (e.g. "/uploads/avatars/abc.jpg")
  if (avatarUrl.startsWith("/uploads/")) return `${API_BASE}${avatarUrl}`;

  return avatarUrl;
}
