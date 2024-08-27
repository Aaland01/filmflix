import axios, { AxiosInstance, AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface LoginResponse {
  access: string;
  refresh: string;
}

const login = async (
  username: string,
  password: string
): Promise<AxiosResponse<any, any>> => {
  try {
    const response = await axiosInstance.post(`/api/login/`, {
      username: username,
      password: password,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to log in");
  }
};

const getToken = async (): Promise<string | null> => {
  try {
    const response = await axiosInstance.get<LoginResponse>("/api/login/");
    return response.data.access;
  } catch (error) {
    console.error("Failed to fetch token:", error);
    return null;
  }
};

const authApi = { login, getToken }; // Rename the default export to avoid conflicts

export { login, getToken, authApi }; // Export individual functions

export default axiosInstance; // Export axiosInstance as default
