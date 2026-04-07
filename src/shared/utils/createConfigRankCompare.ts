export function createConfigRankCompare<T extends string>(
  config: Record<T, { rank: number }>
) {
  return (a?: T, b?: T) => {
    const rankA = a !== undefined ? config[a]?.rank ?? 999 : 999;
    const rankB = b !== undefined ? config[b]?.rank ?? 999 : 999;

    return rankA - rankB;
  };
}
