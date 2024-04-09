export const getDate = (date?: string) => {
  if (date && date !== "?") return date;
  return undefined;
};
