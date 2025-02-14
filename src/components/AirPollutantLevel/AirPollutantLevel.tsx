import { Card, Col, Progress, Row, Typography } from "antd";
import styles from "./styles.module.scss";
import { getAirQualityLevel } from "../../utils/getAirQualityLevel";
import { getProgressColor } from "../../utils/getProgressColor";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/hooks";

interface AirPollutantLevelProps {
  title: string;
  value: number;
  fadeIn: boolean;
  setFadeIn: (item: boolean) => void;
}

const AirPollutantLevel: React.FC<AirPollutantLevelProps> = ({
  title,
  value,
  fadeIn,
  setFadeIn,
}) => {
  const { Text } = Typography;

  const city = useAppSelector((state) => state.weather.weather.data?.name);

  useEffect(() => {
    if (city) {
      const timer = setTimeout(() => setFadeIn(true), 100);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [city, setFadeIn]);

  const { level, percentage } = getAirQualityLevel(title, value);
  const progressColor =
    level !== "Неизвестный параметр" ? getProgressColor(level) : "gray";

  return (
    <Card
      className={`${styles.wrapper} ${styles["fade-motion"]} ${
        fadeIn && styles["fade-motion-enter-active"]
      }`}
      bordered={false}
    >
      <Row
        className={styles.content}
        gutter={[10, 10]}
        justify={"center"}
        align={"middle"}
      >
        <Col span={12}>
          <Text>{title}</Text>
        </Col>
        <Col span={12}>
          <Text>
            {value.toFixed(2)} {title === "co" ? "мг/м³" : "мкг/м³"}
          </Text>
        </Col>
        <Col span={24}>
          <Text>{level}</Text>
        </Col>
        <Col span={24}>
          <Progress
            className={styles.progress}
            showInfo={false}
            percent={percentage}
            strokeColor={progressColor}
            size={["100%", 15]}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default AirPollutantLevel;
