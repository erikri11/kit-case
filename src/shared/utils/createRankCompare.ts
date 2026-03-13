export function createRankCompare<T extends string>(rankMap: Record<T, number>) {
  return (a?: string, b?: string) =>
    (rankMap[a as T] ?? 999) - (rankMap[b as T] ?? 999);
}
