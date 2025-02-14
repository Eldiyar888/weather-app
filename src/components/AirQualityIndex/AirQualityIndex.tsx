import { Card, Col, Row, Typography } from "antd";
import styles from "./styles.module.scss";
import { getAirQualityMessage } from "../../utils/getAirQualityMessage";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/hooks";

interface AirQualityIndexProps {
  value: number;
  fadeIn: boolean;
  setFadeIn: (item: boolean) => void;
}

const AirQualityIndex: React.FC<AirQualityIndexProps> = ({
  value,
  fadeIn,
  setFadeIn,
}) => {
  const { message, color, description } = getAirQualityMessage(value);

  const city = useAppSelector((state) => state.weather.weather.data?.name);

  useEffect(() => {
    if (city) {
      const timer = setTimeout(() => setFadeIn(true), 100);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [city, setFadeIn]);

  return (
    <Card
      bordered={false}
      className={`${styles.wrapper} ${styles["fade-motion"]} ${
        fadeIn && styles["fade-motion-enter-active"]
      }`}
    >
      <Row
        gutter={[10, 10]}
        justify={"center"}
        align={"middle"}
        className={styles.content}
      >
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <Typography.Title
            level={3}
            className={styles.text}
            style={{ color: color }}
          >
            {`${message}`}
          </Typography.Title>
        </Col>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <Typography.Text>{description}</Typography.Text>
        </Col>
      </Row>
    </Card>
  );
};

export default AirQualityIndex;
