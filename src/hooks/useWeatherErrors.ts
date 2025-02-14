import { useAppSelector } from "./hooks";

export const useWeatherErros = () => {
  const weatherError = useAppSelector((state) => state.weather.weather.error);
  const airQualityError = useAppSelector(
    (state) => state.weather.airQuality.error
  );
  const forecastError = useAppSelector((state) => state.weather.forecast.error);

  const error = weatherError || forecastError || airQualityError;

  return { error };
};
