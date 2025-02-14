import styles from "./styles.module.scss";
import { Typography, Empty, Row, Col, Spin } from "antd";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { useAppSelector } from "../../hooks/hooks";
import { weatherConditionMap } from "../../utils/weatherConditionMap";

const { Title, Text } = Typography;

const WeatherOverview = () => {
  const weather = useAppSelector((state) => state.weather);
  const currentWeather = useAppSelector(
    (state) => state.weather.currentWeather
  );
  const units = useAppSelector((state) => state.weather.units);

  const isSuccess = weather.weather.status === "succeeded";
  const isLoading = weather.weather.status === "loading";

  const selectedWeather =
    currentWeather || (isSuccess ? weather.weather.data : null);

  const condition = selectedWeather?.weather[0].icon || "";
  const city = selectedWeather?.name;

  const unitName = units === "metric" ? "°C" : "°F";

  if (isLoading) {
    return (
      <Spin
        style={{
          minHeight: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }

  return (
    <section className={styles.wrapper}>
      {!selectedWeather ? (
        <Empty
          className={styles.empty}
          description="Нет данных о текущей погоде"
        />
      ) : (
        <div className={styles.mainInfo}>
          <WeatherIcon condition={weatherConditionMap[condition]} />
          <Title
            className={`${styles.title} ${
              selectedWeather.main.temp > 0 ? styles.warm : styles.cold
            }`}
            level={2}
          >
            <span>{selectedWeather.main.temp} </span>
            {unitName}
          </Title>
          <Row gutter={10}>
            <Col>
              <Text strong>{city} </Text>
            </Col>
            <Col>
              <Text>(ощущается как: {selectedWeather.main.feels_like})</Text>
            </Col>
          </Row>
        </div>
      )}
    </section>
  );
};

export default WeatherOverview;
