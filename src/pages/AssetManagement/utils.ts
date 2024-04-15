export const getAmount = (amount?: string) => {
  if (!amount || amount === "?") return 0;
  return Number(amount);
};
