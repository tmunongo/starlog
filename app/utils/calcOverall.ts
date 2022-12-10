const costAsScore = (cost: string) => {
  switch (cost) {
    case "Cheap": {
      return 4;
    }
    case "Affordable": {
      return 3;
    }
    case "Upmarket": {
      return 2;
    }
    default:
      return 1;
  }
};

export const calcOverall = (
  upvotes: number,
  downvotes: number,
  cost: string,
  safety: number,
  accessibility: number
) => {
  const WEIGHTS = {
    upvotes: 0.2,
    downvotes: -0.3,
    safetyRating: 0.5,
    affordability: 0.2,
    accessibility: 0.1,
  };
  let score =
    upvotes * WEIGHTS.upvotes +
    downvotes * WEIGHTS.downvotes +
    safety * WEIGHTS.safetyRating +
    costAsScore(cost) * WEIGHTS.accessibility +
    accessibility * WEIGHTS.accessibility;

  return score;
};
