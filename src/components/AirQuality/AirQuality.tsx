import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import AirPollutantLevel from "../AirPollutantLevel/AirPollutantLevel";
import AirQualityIndex from "../AirQualityIndex/AirQualityIndex";
import styles from "./styles.module.scss";
import { fetchCurrentAirPollution } from "../../store/weatherSlice";
import { Empty, Skeleton, Typography } from "antd";

const AirQuality = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const weatherData = useAppSelector((state) => state.weather.weather.data);

  const airQualityData = useAppSelector(
    (state) => state.weather.airQuality.data
  );

  const currentWeather = useAppSelector(
    (state) => state.weather.currentWeather
  );

  const isLoading = useAppSelector((state) => state.weather.airQuality.status);

  const dispatch = useAppDispatch();

  const lat = weatherData?.coord?.lat;
  const lon = weatherData?.coord?.lon;
  const unix = weatherData?.dt ?? 0;

  const dateUnix = new Date(unix * 1000).toDateString();

  const date = currentWeather?.forecast.date
    ? Math.floor(new Date(currentWeather.forecast.date).getTime() / 1000)
    : Math.floor(new Date(dateUnix).getTime() / 1000);

  useEffect(() => {
    if (lat && lon && date) {
      dispatch(fetchCurrentAirPollution({ lat, lon, date }));
    } else {
      dispatch(fetchCurrentAirPollution(null));
    }
  }, [date, dispatch, lat, lon]);

  const aqi = useMemo(
    () => airQualityData?.list[0]?.main.aqi,
    [airQualityData?.list]
  );
  const components = useMemo(
    () => airQualityData?.list[0]?.components,
    [airQualityData?.list]
  );

  const isDataAvailable = aqi && components;

  return (
    <div className={`${styles.wrapper} ${!isDataAvailable && styles.center} `}>
      <Skeleton loading={isLoading === "loading"} active>
        {isDataAvailable ? (
          <>
            <AirQualityIndex
              value={aqi}
              fadeIn={fadeIn}
              setFadeIn={setFadeIn}
            />
            {Object.entries(components)
              .slice(0, 6)
              .map(([type, value]) => (
                <AirPollutantLevel
                  key={type}
                  title={type}
                  value={value}
                  fadeIn={fadeIn}
                  setFadeIn={setFadeIn}
                />
              ))}
          </>
        ) : (
          <Empty description="Нет данных о качестве воздуха" />
        )}
      </Skeleton>
    </div>
  );
};

export default AirQuality;
