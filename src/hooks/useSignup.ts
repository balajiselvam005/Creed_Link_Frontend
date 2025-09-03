import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/app/server/api/userRoute";
import { AxiosError } from "axios";

export const useSignup = () => {
  return useMutation({
    mutationFn: registerUser,
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response?.status === 409) {
        throw new Error("User already exists with this email");
      } else if (axiosError.response?.status === 400) {
        throw new Error("Invalid form data. Please check your inputs.");
      } else {
        throw new Error(
          axiosError.response?.data?.message ||
            "Signup failed. Please try again."
        );
      }
    },
  });
};
