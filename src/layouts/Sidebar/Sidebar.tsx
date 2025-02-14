import Sider from "antd/es/layout/Sider";
import CustomInput from "../../components/UI/CustomInput/CustomInput";
import WeatherOverview from "../../components/WeatherOverview/WeatherOverview";
import WeatherDetails from "../../components/WeatherDetails/WeatherDetails";
import styles from "./styles.module.scss";
import { FC } from "react";

interface SidebarProps {
  value: string;
  onChange: (name: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ value, onChange }) => {
  return (
    <Sider className={styles.wrapper}>
      <div className={styles.sider}>
        <CustomInput
          placeholder="Введите название города"
          value={value}
          onChange={onChange}
        />
        <WeatherOverview />
        <WeatherDetails />
      </div>
    </Sider>
  );
};

export default Sidebar;
