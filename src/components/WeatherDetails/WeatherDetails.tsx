import { Col, Row, Typography } from "antd";
import WeatherDetail from "../WeatherDetail/WeatherDetail";
import styles from "./styles.module.scss";
import { useAppSelector } from "../../hooks/hooks";
import { getHumidityLevel } from "../../utils/getHumidityLevel";
import { getWindDirection } from "../../utils/getWindDirection";
import { formatTimeWithTimezone } from "../../utils/formatTimeWithTimezone";

const WeatherDetails = () => {
  const weather = useAppSelector((state) => state.weather);
  const currentWeather = useAppSelector(
    (state) => state.weather.currentWeather
  );
  const isSuccess = weather.weather.status === "succeeded";
  const isLoading = weather.weather.status === "loading";

  const data = currentWeather || (isSuccess ? weather.weather.data : null);

  const humidity = data?.main?.humidity ?? 0;

  const humidityLevel = getHumidityLevel(humidity);

  const { Text } = Typography;
  return (
    <Row gutter={[12, 12]} className={styles.weatherDetailsWrapper}>
      {weather.weather.data && (
        <>
          <Col span={12} xs={24} sm={24} md={24} lg={12}>
            <WeatherDetail
              title="Влажность"
              condition="humidity"
              loading={isLoading}
            >
              <Col span={24}>
                <Text>Текущая влажность: {data?.main.humidity}%</Text>
              </Col>
              <Col>{humidityLevel}</Col>
            </WeatherDetail>
          </Col>
          <Col span={12} xs={24} sm={24} md={24} lg={12}>
            <WeatherDetail title="Ветер" condition="wind" loading={isLoading}>
              <Col span={24}>
                <Text>Скорость ветра: {data?.wind.speed} м/с</Text>
              </Col>
              <Col span={24}>
                <Text>
                  Направление ветра: {getWindDirection(data?.wind.deg || 0)}
                </Text>
              </Col>
              <Col span={24}>
                <Text>Порывы ветра: {data?.wind.gust} м/с</Text>
              </Col>
            </WeatherDetail>
          </Col>
          <Col span={12} xs={24} sm={24} md={24} lg={12}>
            <WeatherDetail
              title="Облачность"
              condition="cloudy"
              loading={isLoading}
            >
              <Col span={24}>
                <Text>Уровень облачности: {data?.clouds.all}%</Text>
              </Col>
              <Col span={24}>
                <Text>Прогноз облачности: {data?.weather[0].description}</Text>
              </Col>
            </WeatherDetail>
          </Col>
          <Col span={12} xs={24} sm={24} md={24} lg={12}>
            <WeatherDetail
              title="Восход/Закат"
              condition="sunny"
              loading={isLoading}
            >
              {data?.sys.sunrise && data?.sys.sunset ? (
                <>
                  <Col span={24}>
                    <Text>
                      {"Время восхода: " +
                        formatTimeWithTimezone(
                          data?.sys.sunrise,
                          data?.timezone * 1000
                        )}
                    </Text>
                  </Col>
                  <Col span={24}>
                    <Text>
                      {"Время заката: " +
                        formatTimeWithTimezone(
                          data?.sys.sunset,
                          data?.timezone * 1000
                        )}
                    </Text>
                  </Col>
                </>
              ) : (
                <Col span={24}>
                  <Text>Информация о восходе и закате недоступна</Text>
                </Col>
              )}
            </WeatherDetail>
          </Col>
        </>
      )}
    </Row>
  );
};

export default WeatherDetails;
