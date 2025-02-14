import { FC } from "react";
import { Input } from "antd";
import styles from "./styles.module.scss";

interface CustomInputProps {
  width?: number;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomInput: FC<CustomInputProps> = ({
  width,
  placeholder = "Введите текст",
  value,
  onChange,
}) => {
  const widthInput = width ? `${width}px` : "";
  return (
    <Input
      style={{ width: widthInput }}
      className={styles.input}
      placeholder={placeholder}
      allowClear
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default CustomInput;
