"use client";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "@/app/server/api/userRoute";
import { User } from "@/types/user";
import { AuthContext } from "@/contexts/AuthContext";
import { useEffect, useState, ReactNode } from "react";
import { useSignup } from "@/hooks/useSignup";
import { useLogin } from "@/hooks/useLogin";
import { LoginForm, SignupForm } from "@/types/authForm";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    if (!initialized) {
      getCurrentUser()
        .then((res) => {
          setUser(res.data.data.user);
        })
        .catch((error) => {
          console.log("No authenticated user:", error.message);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
          setInitialized(true);
        });
    }
  }, [initialized]);

  const signup = async (form: SignupForm) => {
    signupMutation.mutate(form, {
      onSuccess: (res) => {
        setUser(res.data.data.user);
        router.push("/");
      },
      onError: (error) => {
        console.error("Signup failed:", error.message);
      },
    });
  };

  const login = async ({ email, password }: LoginForm) => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (res) => {
          setUser(res.data.data.user);
          router.push("/");
        },
        onError: (error) => {
          console.error("Login failed:", error.message);
          setUser(null);
        },
      }
    );
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout API call failed:", error);
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
        loading: loading || signupMutation.isPending || loginMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
