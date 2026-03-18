export function formatDate(value: Date | string | null | undefined): string {
  if (!value) return "-";

  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat("nb-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(date)
    .replace(",", "");
}
