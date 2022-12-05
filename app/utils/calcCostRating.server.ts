export const calcCostRating = (cost: Number) => {
  if (cost < 100) {
    return `Cheap`;
  } else if (cost < 250) {
    return `Affordable`;
  } else if (cost < 500) {
    return `Upmarket`;
  } else {
    return `Elite`;
  }
};
