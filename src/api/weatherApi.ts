import axiosInstance from "./axiosInstance";
const API_KEY = "ee24fbda4cb4eb61aba74f2d131a5da6";

export type unit = "metric" | "imperial";

export const getCurrentWeather = async (
  city: string,
  units: unit = "metric"
) => {
  const response = await axiosInstance.get(
    `weather?q=${city}&appid=${API_KEY}&units=${units}&lang=ru`
  );
  return response.data;
};

export const getFiveDayForecastWeather = async (
  city: string,
  units: unit = "metric"
) => {
  const response = await axiosInstance.get(
    `forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=ru`
  );
  return response.data;
};

export const getCurrentAirPollution = async (
  lat: number,
  lon: number,
  date: number
) => {
  const response = await axiosInstance.get(
    `air_pollution/history?lat=${lat}&lon=${lon}&start=${date}&end=${date}&appid=${API_KEY}`
  );
  return response.data;
};
