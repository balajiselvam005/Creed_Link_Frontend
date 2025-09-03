"use client";

import { getCurrentUser, logoutUser } from "@/app/server/api/userRoute";
import { User } from "@/types/user";
import { AuthContext } from "@/contexts/AuthContext";
import { useEffect, useState, ReactNode } from "react";
import { useSignup } from "@/hooks/useSignup";
import { useLogin } from "@/hooks/useLogin";
import { LoginForm, SignupForm } from "@/types/authForm";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);
  const router = useRouter();
  const signupMutation = useSignup();
  const loginMutation = useLogin();

  const refreshCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data.data);
      return res.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.log(
        "No authenticated user:",
        axiosError.response?.data?.message || axiosError.message
      );
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    if (!initialized) {
      refreshCurrentUser().finally(() => {
        setLoading(false);
        setInitialized(true);
      });
    }
  }, [initialized]);

  const signup = async (form: SignupForm) => {
    signupMutation.mutate(form, {
      onSuccess: () => {
        router.push(`/verify-user?email=${form.email}`);
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        console.error(
          "Signup failed:",
          axiosError.response?.data.message || axiosError.message
        );
      },
    });
  };

  const login = async ({ email, password }: LoginForm) => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (res) => {
          if (res.data.success) {
            setUser(res.data.data.user);
            router.push("/");
          } else {
            console.warn("Login failed:", res.data.message);
            setUser(null);
            router.push(`/verify-user?email=${email}`);
          }
        },
        onError: (error: unknown) => {
          const axiosError = error as AxiosError<{ message?: string }>;
          console.error(
            "Login request error:",
            axiosError.response?.data.message || axiosError.message
          );
          setUser(null);
        },
      }
    );
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error(
        "Logout API call failed:",
        axiosError.response?.data.message || axiosError.message
      );
    } finally {
      setUser(null);
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        logout,
        refreshCurrentUser,
        loading: loading || signupMutation.isPending || loginMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
