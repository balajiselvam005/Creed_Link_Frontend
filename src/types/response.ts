import { User } from "./user";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type AuthenticationResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
