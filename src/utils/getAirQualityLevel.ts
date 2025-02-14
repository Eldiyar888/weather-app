type AirQualityLevel = "Хорошо" | "Умеренно" | "Плохо" | "Очень плохо";

type Pollutant = {
  ranges: number[];
  levels: AirQualityLevel[];
};

type PollutantThresholds = {
  [key in
    | "SO2"
    | "NO2"
    | "PM10"
    | "PM2_5"
    | "O3"
    | "CO"
    | "NO"
    | "NH3"]: Pollutant;
};

interface AirQualityResult {
  level: AirQualityLevel | "Неизвестный параметр";
  percentage: number;
}

const pollutantThresholds: PollutantThresholds = {
  SO2: {
    ranges: [50, 100, 250],
    levels: ["Хорошо", "Умеренно", "Плохо", "Очень плохо"],
  },
  NO2: {
    ranges: [40, 100, 200],
    levels: ["Хорошо", "Умеренно", "Плохо", "Очень плохо"],
  },
  PM10: {
    ranges: [20, 50, 100],
    levels: ["Хорошо", "Умеренно", "Плохо", "Очень плохо"],
  },
  PM2_5: {
    ranges: [10, 25, 50],
    levels: ["Хорошо", "Умеренно", "Плохо", "Очень плохо"],
  },
  O3: {
    ranges: [100, 180, 240],
    levels: ["Хорошо", "Умеренно", "Плохо", "Очень плохо"],
  },
  CO: {
    ranges: [5, 10, 35],
    levels: ["Хорошо", "Умеренно", "Плохо", "Очень плохо"],
  },
  NO: {
    ranges: [20, 50, 100],
    levels: ["Хорошо", "Умеренно", "Плохо", "Очень плохо"],
  },
  NH3: {
    ranges: [5, 20, 50],
    levels: ["Хорошо", "Умеренно", "Плохо", "Очень плохо"],
  },
};

export const getAirQualityLevel = (
  type: string,
  value: number
): AirQualityResult => {
  const pollutant =
    pollutantThresholds[type.toUpperCase() as keyof PollutantThresholds];
  if (!pollutant) return { level: "Неизвестный параметр", percentage: 0 };

  const { ranges, levels } = pollutant;

  let level: AirQualityLevel = "Хорошо";
  let percentage: number = 0;

  for (let i = 0; i < ranges.length; i++) {
    if (value <= ranges[i]) {
      level = levels[i];
      const min = i === 0 ? 0 : ranges[i - 1];
      const max = ranges[i];
      const range = max - min;
      percentage = ((value - min) / range) * 100;
      break;
    }
  }

  if (percentage === 0 && value > ranges[ranges.length - 1]) {
    percentage = 100;
    level = levels[levels.length - 1];
  }

  return { level, percentage };
};
