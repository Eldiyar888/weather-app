export const formatTimeWithTimezone = (
  timestamp: number,
  timezoneOffset: number
) => {
  if (!timestamp) return null;
  const localTime = new Date((timestamp + timezoneOffset) * 1000);
  return localTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
