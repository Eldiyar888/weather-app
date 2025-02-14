type AirQualityStatus = "Хорошо" | "Умеренно" | "Плохо" | "Очень плохо";

type AirQualityColors = {
  [key in AirQualityStatus]: string;
};

export const getProgressColor = (status: AirQualityStatus): string => {
  const statusColor: AirQualityColors = {
    Хорошо: "#94C954",
    Умеренно: "#EFC40D",
    Плохо: "#FB983B",
    "Очень плохо": "#F03840",
  };

  return statusColor[status];
};
