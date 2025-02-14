interface IndexQuality {
  message: string;
  color: string;
  description: string;
}

export const getAirQualityMessage = (qualityIndex: number) => {
  const messages: Record<number, IndexQuality> = {
    1: {
      message: "Качество воздуха отличное",
      color: "#00B050",
      description:
        "Воздух чистый и свежий. Можно спокойно заниматься любой активностью на улице.",
    },
    2: {
      message: "Качество воздуха удовлетворительное",
      color: "#94C954",
      description:
        "Воздух в норме, но люди с повышенной чувствительностью могут почувствовать легкий дискомфорт.",
    },
    3: {
      message: "Качество воздуха умеренно загрязненное",
      color: "#EFC40D",
      description:
        "Возможно возникновение дискомфорта у чувствительных людей. Лучше избегать длительных нагрузок на улице.",
    },
    4: {
      message: "Качество воздуха плохое",
      color: "#FB983B",
      description:
        "Загрязнение воздуха может повлиять на здоровье. Рекомендуется ограничить пребывание на улице.",
    },
    5: {
      message: "Качество воздуха очень плохое",
      color: "#F03840",
      description:
        "Опасный уровень загрязнения. Не рекомендуется выходить на улицу без необходимости.",
    },
  };
  return (
    messages[qualityIndex] || {
      message: "Неизвестное качество",
      color: "#000000",
    }
  );
};
