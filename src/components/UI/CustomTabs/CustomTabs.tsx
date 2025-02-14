import { Segmented } from "antd";
import styles from "./styles.module.scss";
import React from "react";

interface CustomTabsProps {
  onChange: (value: string) => void;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ onChange }) => {
  return (
    <Segmented
      className={styles.tab}
      options={["Сегодня", "Завтра", "На 5 дней"]}
      onChange={onChange}
      block
    />
  );
};

export default CustomTabs;
