import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return Promise.reject({
          status: error.response.status,
          message: error.response.data.message,
        });
      } else if (error.request) {
        return Promise.reject({
          status: null,
          message: "No response from server",
        });
      } else {
        return Promise.reject({
          status: null,
          message: error.message,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
