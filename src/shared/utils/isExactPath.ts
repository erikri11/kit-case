export function isExactPath(pathname: string, url?: string) {
  if (!url) return false;
  return pathname === url;
}
