import { useEffect, useState } from "react";
import CustomTabs from "../UI/CustomTabs/CustomTabs";
import { Button, Card, Col, Empty, Row, Skeleton, Typography } from "antd";
import styles from "./styles.module.scss";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchFiveDayForecast,
  setCurrentWeather,
  setUnits,
} from "../../store/weatherSlice";
import { weatherConditionMap } from "../../utils/weatherConditionMap";
import { getFiveDayForecastData } from "../../utils/getFiveDayForecastData";
import { formatDate } from "../../utils/formatDate";
import { IFiveDayForecastItem } from "../../types/weather";

const ForecastSwitcher = () => {
  const { Text } = Typography;

  const [isActive, setIsActive] = useState("");
  const [selectedTab, setSelectedTab] = useState("Сегодня");
  const [fadeIn, setFadeIn] = useState(false);

  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.weather.weather.data?.name);
  const units = useAppSelector((state) => state.weather.units);
  const weatherForecast = useAppSelector((state) => state.weather.forecast);

  const forecastData = weatherForecast.data;
  const fiveDayForecast = forecastData
    ? getFiveDayForecastData(forecastData)
    : [];

  const toggleActive = (item: IFiveDayForecastItem) => {
    dispatch(setCurrentWeather(item));
    setIsActive(item.forecast.id);
  };

  useEffect(() => {
    dispatch(fetchFiveDayForecast({ city: city || "", units: units }));
  }, [city, dispatch, units]);

  useEffect(() => {
    if (weatherForecast.status == "succeeded" && weatherForecast.data && city) {
      const timer = setTimeout(() => setFadeIn(true), 100);
      return () => {
        setFadeIn(false);
        clearTimeout(timer);
      };
    }
  }, [weatherForecast.data, weatherForecast.status, city]);


  const onChange = (value: string) => {
    setSelectedTab(value);
  };

  const getForecastForSelectedDay = () => {
    if (selectedTab === "Сегодня") {
      return [fiveDayForecast[0]];
    } else if (selectedTab === "Завтра") {
      return [fiveDayForecast[1]];
    } else {
      return fiveDayForecast;
    }
  };

  const selectedForecast = getForecastForSelectedDay();

  const toggleUnits = () => {
    dispatch(setUnits());
  };

  const unitName = units === "metric" ? "°C" : "°F";

  useEffect(() => {
    if (weatherForecast.data && isActive) {
      const updatedActiveDay = getFiveDayForecastData(
        weatherForecast.data
      ).find((item) => item.forecast.id === isActive);

      if (updatedActiveDay) {
        dispatch(setCurrentWeather(updatedActiveDay));
      }
    }
  }, [weatherForecast.data, isActive, dispatch]);

  return (
    <div
      className={`${styles.forecastSwitcher} ${
        !weatherForecast.data ? styles.emptyState : ""
      }`}
    >
      <Row gutter={[10, 10]} className={styles.tabs}>
        <Col className={styles.tabsWrapper}>
          <CustomTabs onChange={onChange} />
        </Col>
        <Col className={styles.btnWrapper}>
          <Button onClick={toggleUnits} type="text">
            {units === "metric" ? "Фарренгейт" : "Цельсия"}
          </Button>
        </Col>
      </Row>
      <Skeleton
        loading={weatherForecast.status === "loading"}
        className={styles.skeleton}
      >
        <div
          className={`${styles.cardWrapper} ${
            !weatherForecast.data ? styles.center : ""
          }`}
        >
          {weatherForecast.data ? (
            selectedForecast.map((item) => {
              return (
                <Card
                  key={item.forecast.id}
                  className={`${styles.card} ${
                    selectedForecast.length < 2 && styles.fullWidth
                  } ${styles["fade-motion"]} ${
                    fadeIn && styles["fade-motion-enter-active"]
                  } ${item.forecast.id === isActive && styles.active}`}
                  bordered={false}
                  hoverable
                  onClick={() => toggleActive(item)}
                >
                  <Row gutter={[15, 20]} className={styles.cardRow}>
                    <Col span={24}>
                      <Text ellipsis>{formatDate(item.forecast.date)}</Text>
                    </Col>
                    <Col
                      span={24}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <WeatherIcon
                        condition={weatherConditionMap[item.forecast.icon]}
                      />
                    </Col>
                    <Col span={24}>
                      <Text
                        ellipsis
                        className={
                          Number(item.forecast.temp) > 0
                            ? styles.warm
                            : styles.cold
                        }
                      >
                        {item.forecast.temp} {unitName}
                      </Text>
                    </Col>
                  </Row>
                </Card>
              );
            })
          ) : (
            <Empty
              description="Прогноз на 5 дней недоступен"
            />
          )}
        </div>
      </Skeleton>
    </div>
  );
};

export default ForecastSwitcher;
