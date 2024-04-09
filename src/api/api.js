import axios from "axios";
import { BASE_URL } from "../constants/ApiRoutes";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem("token");
    return config;
  },
  (error) => {
    // Manipule os erros de interceptação de solicitação, se necessário
    return Promise.reject(error);
  }
);

export default api;
