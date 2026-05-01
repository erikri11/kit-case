export function generateSku(): string {
  const number = Math.floor(100 + Math.random() * 900);

  const letters = Array.from({ length: 5 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");

  return `${number}_${letters}`;
}
