function selectColor(score: number) {
  if (score < 5) {
    return "red";
  } else if (score > 5 && score < 8) {
    return "orange";
  }
  return "green";
}

export const generateScoreVisual = (score: any) => {
  const style = {
    width: `${score * 10}%`,
    backgroundColor: selectColor(score),
  };

  return (
    <div
      style={{
        padding: 1,
      }}
    >
      <div
        className={`h-4 md:h-5 bg-[${selectColor(
          score
        )}] rounded-xl border border-black m-2`}
        style={style}
      ></div>
    </div>
  );
};
