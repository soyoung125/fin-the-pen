export const getColors = (value: string) => {
  switch (value) {
    case "used":
      return ["#735BF2", "#F7F7F8"];
    case "useable":
      return ["#F7F7F8", "#735BF2"];
    default:
      return ["#735BF2", "#F7F7F8"];
  }
};

export const getData = (used: number, useable: number, goal: number) => {
  if (goal <= used) return [100, 0];
  return [(used / goal) * 100, (useable / goal) * 100];
};
