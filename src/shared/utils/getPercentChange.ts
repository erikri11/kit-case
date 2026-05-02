export function getPercentChange(
  current: number,
  previous: number
): number | null {
  if (previous === 0) {
    return current > 0 ? null : 0;
  }

  return ((current - previous) / previous) * 100;
}
