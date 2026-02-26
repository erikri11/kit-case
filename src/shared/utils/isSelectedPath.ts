export function isSelectedPath(pathname: string, url?: string) {
  if (!url) return false;
  return pathname === url || pathname.startsWith(url + '/');
}
