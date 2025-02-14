import { Content } from "antd/es/layout/layout";
import ForecastSwitcher from "../../components/ForecastSwitcher/ForecastSwitcher";
import AirQuality from "../../components/AirQuality/AirQuality";
import styles from "./styles.module.scss";

const MainContent = () => {
  return (
    <Content className={styles.content}>
      <ForecastSwitcher />
      <AirQuality />
    </Content>
  );
};

export default MainContent;
