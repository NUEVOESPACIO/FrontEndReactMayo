import { apiClient } from "./axiosClient";
import { normalizeLoginResponse } from "../utils/normalizeLoginResponse";

import type {
  LoginRequest,
  LoginResponse,
} from "../types/authTypes";

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});




export const loginRequest = async (
  data: LoginRequest
): Promise<LoginResponse> => {

  const response = await apiClient.post(
    "/auth/login",
    data
  );

  return normalizeLoginResponse(response.data);
};