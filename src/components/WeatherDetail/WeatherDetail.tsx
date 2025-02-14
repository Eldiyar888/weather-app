import React, { ReactNode, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import WeatherIcon, { WeatherCondition } from "../WeatherIcon/WeatherIcon";
import { Card, Col, Row, Typography } from "antd";

interface WeatherDetailProps {
  title: string;
  condition: WeatherCondition;
  children: ReactNode;
  loading: boolean;
}

const WeatherDetail = ({
  title,
  condition,
  loading,
  children,
}: WeatherDetailProps) => {
  const { Text } = Typography;
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Card
      title={
        <Row align="middle" justify="space-between" gutter={[10, 15]}>
          <Col>
            <Text>{title}</Text>
          </Col>
          <Col>
            <WeatherIcon
              condition={condition}
              width={25}
              height={25}
              light={false}
            />
          </Col>
        </Row>
      }
      loading={loading}
      bordered={false}
      className={`${styles.wrapper} ${styles["fade-motion"]} ${
        fadeIn && styles["fade-motion-enter-active"]
      }`}
    >
      <Row gutter={[0, 10]}>{children}</Row>
    </Card>
  );
};

export default WeatherDetail;
