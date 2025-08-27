import { api } from "@/lib/api";
import { ApiResponse, AuthenticationResponse } from "@/types/response";
import { User } from "@/types/user";

export const registerUser = (payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return api.post<ApiResponse<AuthenticationResponse>>(
    "/api/v1/auth/register",
    payload
  );
};

export const loginUser = (payload: { email: string; password: string }) => {
  return api.post<ApiResponse<AuthenticationResponse>>(
    "/api/v1/auth/authenticate",
    payload
  );
};

export const logoutUser = () => {
  return api.post<ApiResponse<null>>("/api/v1/auth/logout");
};

export const getCurrentUser = () => {
  return api.get<ApiResponse<AuthenticationResponse>>("/api/v1/auth/me", {
    withCredentials: true,
  });
};
