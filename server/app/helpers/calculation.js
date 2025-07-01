export const calculateBasicValue = (finalValue, percentage) => {
  return finalValue / (1 + percentage / 100);
};
export const calculatePercentage = (value, percentage = 18) => {
  return value * (percentage / 100);
};
