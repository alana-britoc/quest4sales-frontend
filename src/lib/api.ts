import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import type { ApiErrorResponse } from "@/dtos/ApiErrorResponse";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

const AUTH_TOKEN_KEY = "q4s_auth_token";

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "Erro desconhecido";

      switch (status) {
        case 401:
          localStorage.removeItem(AUTH_TOKEN_KEY);
          localStorage.removeItem("q4s_refresh_token");
          window.location.href = "/login";
          toast.error("Sua sessão expirou. Faça login novamente.");
          break;

        case 403:
          toast.error(message || "Você não tem permissão para fazer isso.");
          break;

        case 500:
          toast.error("Ops! Ocorreu um erro interno no servidor.");
          break;
        
        case 400:
        case 404:
          break;

        default:
          toast.error(message);
          break;
      }
    } else if (error.request) {
      toast.error("Não foi possível conectar ao servidor.");
    } else {
      toast.error("Ocorreu um erro inesperado.");
    }

    return Promise.reject(error);
  }
);