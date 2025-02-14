import SunnyIcon from "../../assets/Color=On.svg?react";
import ClearNightIcon from "../../assets/Color=On-1.svg?react";
import CloudyIcon from "../../assets/Color=On-2.svg?react";
import PartlyCloudyIcon from "../../assets/Color=On-3.svg?react";
import CloudyClearAtTimesIcon from "../../assets/Color=On-4.svg?react";
import PartlyCloudyNightIcon from "../../assets/Color=On-5.svg?react";
import CloudyClearAtTimesNightIcon from "../../assets/Color=On-6.svg?react";
import FogIcon from "../../assets/Color=On-7.svg?react";
import HumidityIcon from "../../assets/Color=On-8.svg?react";
import HeavyRainIcon from "../../assets/Color=On-9.svg?react";
import ScatteradShowersIcon from "../../assets/Color=On-10.svg?react";
import ScatteradShowersNightIcon from "../../assets/Color=On-11.svg?react";
import RainIcon from "../../assets/Color=On-12.svg?react";
import RainSunIcon from "../../assets/Color=On-13.svg?react";
import RainNightIcon from "../../assets/Color=On-14.svg?react";
import DrizzleIcon from "../../assets/Color=On-15.svg?react";
import DrizzleSunIcon from "../../assets/Color=On-16.svg?react";
import DrizzleNightIcon from "../../assets/Color=On-17.svg?react";
import SeverThunderstormIcon from "../../assets/Color=On-18.svg?react";
import ScatteradThunderstormIcon from "../../assets/Color=On-19.svg?react";
import RainThunderstormIcon from "../../assets/Color=On-20.svg?react";
import BlizzardIcon from "../../assets/Color=On-21.svg?react";
import SleetIcon from "../../assets/Color=On-22.svg?react";
import SnowIcon from "../../assets/Color=On-23.svg?react";
import WindIcon from "../../assets/Color=On-24.svg?react";
import BlowingSnowIcon from "../../assets/Color=On-25.svg?react";
import HailIcon from "../../assets/Color=On-26.svg?react";
import React from "react";
import styles from "./styles.module.scss";

export type WeatherCondition =
  | "sunny"
  | "clearNight"
  | "cloudy"
  | "partlyCloudy"
  | "cloudyClearAtTimes"
  | "partlyCloudyNight"
  | "cloudyClearAtTimesNight"
  | "fog"
  | "humidity"
  | "heavyRain"
  | "scatteradShowers"
  | "scatteradShowersNight"
  | "rain"
  | "rainSun"
  | "rainNight"
  | "drizzle"
  | "drizzleSun"
  | "drizzleNight"
  | "severThunderstorm"
  | "scatteradThunderstorm"
  | "rainThunderstorm"
  | "blizzard"
  | "sleet"
  | "snow"
  | "wind"
  | "blowingSnow"
  | "hail";

interface WeatherIconProps {
  condition: WeatherCondition;
  width?: number;
  height?: number;
  light?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({
  condition,
  width = 50,
  height = 50,
  light = true,
}) => {
  const icons = {
    sunny: SunnyIcon,
    clearNight: ClearNightIcon,
    cloudy: CloudyIcon,
    partlyCloudy: PartlyCloudyIcon,
    cloudyClearAtTimes: CloudyClearAtTimesIcon,
    partlyCloudyNight: PartlyCloudyNightIcon,
    cloudyClearAtTimesNight: CloudyClearAtTimesNightIcon,
    fog: FogIcon,
    humidity: HumidityIcon,
    heavyRain: HeavyRainIcon,
    scatteradShowers: ScatteradShowersIcon,
    scatteradShowersNight: ScatteradShowersNightIcon,
    rain: RainIcon,
    rainSun: RainSunIcon,
    rainNight: RainNightIcon,
    drizzle: DrizzleIcon,
    drizzleSun: DrizzleSunIcon,
    drizzleNight: DrizzleNightIcon,
    severThunderstorm: SeverThunderstormIcon,
    scatteradThunderstorm: ScatteradThunderstormIcon,
    rainThunderstorm: RainThunderstormIcon,
    blizzard: BlizzardIcon,
    sleet: SleetIcon,
    snow: SnowIcon,
    wind: WindIcon,
    blowingSnow: BlowingSnowIcon,
    hail: HailIcon,
  };
  const Icon = icons[condition] || SunnyIcon;

  return (
    <Icon width={width} height={height} className={light ? styles.icon : ""} />
  );
};

export default WeatherIcon;
