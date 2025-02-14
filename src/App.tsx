import { ConfigProvider, Layout } from "antd";
import "antd/dist/reset.css";
import styles from "./App.module.scss";
import { useAppDispatch } from "./hooks/hooks";
import { clearErrors } from "./store/weatherSlice";
import useDebounce from "./hooks/useDebounce";
import { theme } from "./theme/theme";
import Sidebar from "./layouts/Sidebar/Sidebar";
import MainContent from "./layouts/MainContent/MainContent";
import ErrorResult from "./components/UI/ErrorResult/ErrorResult";
import { useWeatherSearch } from "./hooks/useWeatherSearch";
import { useWeatherData } from "./hooks/useWeatherData";
import { useWeatherErros } from "./hooks/useWeatherErrors";

function App() {
  const dispatch = useAppDispatch();

  const { name, onChange, setName } = useWeatherSearch();
  const debouncedValue = useDebounce(name, 1000);
  useWeatherData(debouncedValue);
  const { error } = useWeatherErros();

  const goToHome = () => {
    setName("");
    dispatch(clearErrors());
  };

  return (
    <ConfigProvider theme={{ ...theme }}>
      <Layout className={styles.layout}>
        {error ? (
          <ErrorResult error={error} goToHome={goToHome} />
        ) : (
          <>
            <Sidebar onChange={onChange} value={name} />
            <MainContent />
          </>
        )}
      </Layout>
    </ConfigProvider>
  );
}

export default App;
