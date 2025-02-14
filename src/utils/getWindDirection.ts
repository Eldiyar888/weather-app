export const getWindDirection = (deg: number) => {
    if (deg >= 0 && deg < 45) return "Север";
    if (deg >= 45 && deg < 90) return "Северо-восток";
    if (deg >= 90 && deg < 135) return "Восток";
    if (deg >= 135 && deg < 180) return "Юго-восток";
    if (deg >= 180 && deg < 225) return "Юг";
    if (deg >= 225 && deg < 270) return "Юго-запад";
    if (deg >= 270 && deg < 315) return "Запад";
    if (deg >= 315 && deg < 360) return "Северо-запад";
    return "Неизвестно";
  };