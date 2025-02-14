import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrentAirPollution,
  getCurrentWeather,
  getFiveDayForecastWeather,
  unit,
} from "../api/weatherApi";
import { ErrorDetails, WeatherState } from "../types/weather";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (
    { city, units }: { city: string; units: unit },
    { rejectWithValue }
  ) => {
    if (!city) {
      return;
    }
    try {
      const response = await getCurrentWeather(city, units);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchFiveDayForecast = createAsyncThunk(
  "weather/fetchFiveDayForecast",
  async (
    { city, units }: { city: string; units: unit },
    { rejectWithValue }
  ) => {
    if (!city) {
      return;
    }
    try {
      const response = await getFiveDayForecastWeather(city, units);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCurrentAirPollution = createAsyncThunk(
  "weather/fetchCurrentAirPollution",
  async (
    location: { lat: number; lon: number; date: number } | null,
    { rejectWithValue }
  ) => {
    if (location === null) {
      return;
    }
    try {
      const response = await getCurrentAirPollution(
        location.lat,
        location.lon,
        location.date
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: WeatherState = {
  units: "metric",
  currentWeather: null,
  weather: {
    data: null,
    status: "idle",
    error: null,
  },
  forecast: {
    data: null,
    status: "idle",
    error: null,
  },
  airQuality: {
    data: null,
    status: "idle",
    error: null,
  },
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setUnits(state) {
      state.units = state.units === "metric" ? "imperial" : "metric";
    },
    setCurrentWeather(state, action) {
      state.currentWeather = action.payload;
    },
    setWeatherError(state) {
      state.weather.error = null;
    },
    setAirQualityError(state) {
      state.airQuality.error = null;
    },
    setForecastError(state) {
      state.forecast.error = null;
    },
    clearErrors(state) {
      state.weather.error = null;
      state.forecast.error = null;
      state.airQuality.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.weather.status = "loading";
    });
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.weather.status = "succeeded";
      state.weather.data = action.payload;
    });
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.weather.status = "failed";
      state.weather.error = action.payload as ErrorDetails;
    });
    builder.addCase(fetchFiveDayForecast.pending, (state) => {
      state.forecast.status = "loading";
    });
    builder.addCase(fetchFiveDayForecast.fulfilled, (state, action) => {
      state.forecast.status = "succeeded";
      state.forecast.data = action.payload;
    });
    builder.addCase(fetchFiveDayForecast.rejected, (state, action) => {
      state.forecast.status = "failed";
      state.forecast.error = action.payload as ErrorDetails;
    });
    builder.addCase(fetchCurrentAirPollution.pending, (state) => {
      state.airQuality.status = "loading";
    });
    builder.addCase(fetchCurrentAirPollution.fulfilled, (state, action) => {
      state.airQuality.status = "succeeded";
      state.airQuality.data = action.payload;
    });
    builder.addCase(fetchCurrentAirPollution.rejected, (state, action) => {
      state.airQuality.status = "failed";
      state.airQuality.error = action.payload as ErrorDetails;
    });
  },
});

export const {
  setWeatherError,
  setAirQualityError,
  setForecastError,
  clearErrors,
  setCurrentWeather,
  setUnits,
} = weatherSlice.actions;

export default weatherSlice.reducer;
