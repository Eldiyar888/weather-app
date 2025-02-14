export const getHumidityLevel = (humidity: number) => {
  if (humidity > 80) {
    return "Высокая влажность";
  } else if (humidity >= 60 && humidity <= 80) {
    return "Оптимальная влажность";
  } else {
    return "Низкая влажность";
  }
};
