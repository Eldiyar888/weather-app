export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });
};
