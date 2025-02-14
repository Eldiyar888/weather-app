import { unit } from "../api/weatherApi";

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface IForecast {
  id: string;
  date: string;
  temp: number;
  icon: string;
}

export interface IFiveDayForecastItem
  extends Pick<
    WeatherData,
    "weather" | "main" | "wind" | "clouds" | "name" | "timezone"
  > {
  forecast: IForecast;
  sys: Pick<WeatherData["sys"], "sunrise" | "sunset">;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface WeatherDetails {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Rain {
  [key: string]: number;
}

export interface Sys {
  pod: string;
}

export interface WeatherItem {
  dt: number;
  main: WeatherMain;
  weather: WeatherDetails[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

export interface City {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface FiveDayForecast {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherItem[];
  city: City;
}

interface Coordinates {
  coord: [number, number];
}

interface AirQualityMain {
  aqi: number;
}

interface AirQualityComponents {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

interface AirQualityListItem {
  dt: number;
  main: AirQualityMain;
  components: AirQualityComponents;
}

interface AirQualityResponse extends Coordinates {
  list: AirQualityListItem[];
}

export interface ErrorDetails {
  status: number | null;
  message: string;
}

export interface WeatherDataState<T> {
  data: T | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: ErrorDetails | null;
}

export interface WeatherState {
  units: unit;
  currentWeather: IFiveDayForecastItem | null;
  weather: WeatherDataState<WeatherData>;
  forecast: WeatherDataState<FiveDayForecast>;
  airQuality: WeatherDataState<AirQualityResponse>;
}
