import axios, {
  type InternalAxiosRequestConfig,
  type AxiosRequestHeaders,
} from "axios";
import { getToken } from "./userService";

const API_URL = "http://localhost:4000";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.href = "/login";
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `API response error [${error.response.status}]:`,
        error.response.data
      );

      if (error.response.status === 401) {
        handleLogout();
      }
    } else {
      console.error("Unexpected error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
