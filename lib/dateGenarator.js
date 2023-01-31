export const dateGenarator = (date, publish) => {
  let one = new Date();
  one.setDate(one.getDate() - 1);
  // Today- ABC4FF
  // yesterday- CCDBFD
  // Day before yesterday-EDF2FB
  let two = new Date();
  two.setDate(two.getDate() - 2);

  const color =
    new Date().getMonth() === new Date(date).getMonth() &&
    new Date().getFullYear() === new Date(date).getFullYear() &&
    new Date().getDate() === new Date(date).getDate()
      ? "#3f58dd5e"
      : new Date().getMonth() === new Date(date).getMonth() &&
        new Date().getFullYear() === new Date(date).getFullYear() &&
        one.getDate() === new Date(date).getDate()
      ? "#4ac74f4a"
      : new Date().getMonth() === new Date(date).getMonth() &&
        new Date().getFullYear() === new Date(date).getFullYear() &&
        two.getDate() === new Date(date).getDate()
      ? "#e2d13d4f"
      : !publish
      ? "#eee"
      : "#fff";

  return color;
};
