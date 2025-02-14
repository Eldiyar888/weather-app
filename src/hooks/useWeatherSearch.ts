import { useState } from "react";

export const useWeatherSearch = () => {
  const [name, setName] = useState("");

  const onChange = (name: string) => {
    setName(name);
  };

  return { onChange, name, setName };
};
