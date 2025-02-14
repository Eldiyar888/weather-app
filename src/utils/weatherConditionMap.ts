import { WeatherCondition } from "../components/WeatherIcon/WeatherIcon";

export const weatherConditionMap: { [key: string]: WeatherCondition } = {
  "01d": "sunny",
  "01n": "clearNight",
  "02d": "partlyCloudy",
  "02n": "partlyCloudyNight",
  "03d": "cloudy",
  "03n": "cloudyClearAtTimesNight",
  "04d": "cloudyClearAtTimes",
  "04n": "cloudyClearAtTimesNight",
  "09d": "scatteradShowers",
  "09n": "scatteradShowersNight",
  "10d": "rain",
  "10n": "rainNight",
  "11d": "severThunderstorm",
  "11n": "scatteradThunderstorm",
  "13d": "snow",
  "13n": "snow",
  "50d": "fog",
  "50n": "fog",
};
