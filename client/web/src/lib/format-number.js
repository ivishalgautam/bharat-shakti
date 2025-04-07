export function formatNumber(value) {
  if (!value) return "0";
  return Number.parseInt(value).toLocaleString("en-IN");
}
