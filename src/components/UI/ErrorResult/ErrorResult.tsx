import { Button, Result } from "antd";
import { ResultStatusType } from "antd/es/result";
import { FC } from "react";
import { ErrorDetails } from "../../../types/weather";

interface ErrorResultProps {
  error: ErrorDetails;
  goToHome: () => void;
}

const ErrorResult: FC<ErrorResultProps> = ({ error, goToHome }) => {
  return (
    <Result
      status={(error?.status as ResultStatusType) || "500"}
      title={error?.message || "Произошла ошибка"}
      extra={<Button onClick={goToHome}>Назад</Button>}
    />
  );
};

export default ErrorResult;
