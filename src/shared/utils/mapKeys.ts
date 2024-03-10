export function mapKeys(params: Record<string, any>) {
  const keys = Object.keys(params).join(",");
  const items = Object.keys(params)
    .map((_, index) => `$${index + 1}`)
    .join(",");

  const values = Object.values(params);

  return { keys, items, values };
}
