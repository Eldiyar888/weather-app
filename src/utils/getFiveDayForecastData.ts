import { FiveDayForecast, IFiveDayForecastItem } from "../types/weather";

export const getFiveDayForecastData = (
  forecastData: FiveDayForecast
): IFiveDayForecastItem[] => {
  const fiveDayForecast = [];

  for (let i = 0; i < 5; i++) {
    const dayData = forecastData.list.slice(i * 8, (i + 1) * 8);

    const averageTemp =
      dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length;

    fiveDayForecast.push({
      forecast: {
        id: `${dayData[0].weather[0].id}-${dayData[0].dt_txt}`,
        date: dayData[0].dt_txt,
        temp: Number(averageTemp.toFixed(2)),
        icon: dayData[0].weather[0].icon,
      },
      weather: [{ ...dayData[0]?.weather[0] }],
      main: {
        ...dayData[0].main,
        temp: Number(averageTemp.toFixed(2)),
      },
      wind: {
        ...dayData[0].wind,
      },
      clouds: {
        ...dayData[0].clouds,
      },
      name: forecastData.city.name,
      sys: {
        sunrise: forecastData.city.sunrise,
        sunset: forecastData.city.sunset,
      },
      timezone: forecastData.city.timezone,
    });
  }

  return fiveDayForecast;
};
