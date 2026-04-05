export function resolveSelectedValue(options: { id: string }[], id: string): string {
  return options.some((option) => option.id === id) ? id : "";
}
