export const formatDate = (timestamp: Date | null) => {
  let date;
  if (timestamp) {
    date = new Date(timestamp).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return date;
};
