export const getColors = (value: string) => {
  switch (value) {
    case "total":
      return ["#735BF2", "#F7F7F8"];
    case "left":
      return ["#F7F7F8", "#735BF2"];
    default:
      return ["#735BF2", "#F7F7F8"];
  }
};

export const getData = (ratio: number) => {
  if (ratio > 100) return [100, 0];
  return [ratio, 100 - ratio];
};
