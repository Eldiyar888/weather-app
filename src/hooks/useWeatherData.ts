import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchWeather, setCurrentWeather } from "../store/weatherSlice";

export const useWeatherData = (city: string) => {
  const dispatch = useAppDispatch();
  const units = useAppSelector((state) => state.weather.units);

  useEffect(() => {
    if (!city) {
      dispatch(setCurrentWeather(null));
    }
  }, [city, dispatch]);

  useEffect(() => {
    dispatch(fetchWeather({ city, units }));
  }, [city, dispatch, units]);
};
