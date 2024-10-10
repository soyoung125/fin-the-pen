export const getTitle = (label: string) => {
  switch (label) {
    case "used":
      return "현재";
    case "predict":
      return "예정";
    case "useable":
      return "잔액";
    default:
      return "";
  }
};

export const getColors = (label: string) => {
  switch (label) {
    case "used":
      return ["#735BF2", "#DEE0E3", "#F7F7F8"];
    case "predict":
      return ["#C8CBD0", "#FF769F", "#F7F7F8"];
    case "useable":
      return ["#C8CBD0", "#DEE0E3", "#0075FF"];
    default:
      return ["#735BF2", "#FF769F", "#0075FF"];
  }
};

export const getData = (
  goal: number,
  used: number,
  predict: number,
  useable: number
) => {
  if (used > goal) return [100, 0, 0];
  const usedRate = Math.trunc((used / goal) * 100);

  if (useable < 0 || used + predict > goal) {
    return [usedRate, 100 - usedRate, 0];
  }

  const predictRate = Math.trunc((predict / goal) * 100);
  return [usedRate, predictRate, 100 - usedRate - predictRate];
};
