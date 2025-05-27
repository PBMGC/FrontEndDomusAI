import axios from "axios";

const createApiClient = (contentType = "application/json") => {
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
      "Content-Type": contentType,
    },
    withCredentials: true,
  });

  apiClient.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("auth-storage") || "{}")
      ?.state?.user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return apiClient;
};

export const apiClient = createApiClient();
