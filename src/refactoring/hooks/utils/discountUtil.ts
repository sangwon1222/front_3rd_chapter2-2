export const convertPercentage = (rate: number) => (rate * 100).toFixed(0);

export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[]
) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};
