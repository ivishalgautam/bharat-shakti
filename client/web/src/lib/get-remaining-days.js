export function getRemainingDays(dateString) {
  const endDate = new Date(
    dateString.includes("T") ? dateString : dateString.split(" ").join("T"),
  );
  const today = new Date();
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
