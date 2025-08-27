"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { HTMLMotionProps, motion } from "framer-motion";
import { useSignup } from "@/hooks/useSignup";
import { useLogin } from "@/hooks/useLogin";
import { useAuth } from "@/hooks/useAuth";
import { SignupForm } from "@/types/authForm";

const AuthCard = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    const searchParam = useSearchParams();
    const router = useRouter();
    const initialMode =
      searchParam.get("mode") === "signup" ? "signup" : "login";
    const [mode, setMode] = useState<"signup" | "login">(initialMode);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [form, setForm] = useState<SignupForm>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const signupMutation = useSignup();
    const loginMutation = useLogin();
    const { login, signup } = useAuth();

    useEffect(() => {
      const urlMode = searchParam.get("mode");
      if (urlMode === "signup" || urlMode === "login") {
        setMode(urlMode);
      }
    }, [searchParam]);

    const toggleMode = () => {
      const newMode = mode === "login" ? "signup" : "login";
      setMode(newMode);
      setErrors({}); // Clear errors when switching modes
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }); // Reset form
      router.push(`/auth?mode=${newMode}`);
    };

    const validateForm = (): boolean => {
      const newErrors: Record<string, string> = {};

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!form.email) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(form.email)) {
        newErrors.email = "Please enter a valid email";
      }

      // Password validation
      if (!form.password) {
        newErrors.password = "Password is required";
      } else if (form.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (mode === "signup") {
        // First name validation
        if (!form.firstName.trim()) {
          newErrors.firstName = "First name is required";
        }

        // Last name validation
        if (!form.lastName.trim()) {
          newErrors.lastName = "Last name is required";
        }

        // Confirm password validation
        if (!form.confirmPassword) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (form.password !== form.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });

      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors({ ...errors, [name]: "" });
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      if (mode === "signup") {
        signup(form);
      } else {
        login({ email: form.email, password: form.password });
      }
    };

    const isLoading = signupMutation.isPending || loginMutation.isPending;
    const apiError = signupMutation.error || loginMutation.error;

    return (
      <motion.div
        ref={ref}
        layout
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={cn(
          "rounded-xl bg-gray-300 shadow-2xl w-[400px] p-6 space-y-6 overflow-hidden",
          className
        )}
        {...props}
      >
        <h2 className="text-2xl font-semibold text-center">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-3">
              <Input
                label="First name"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                value={form.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <Input
                label="Last name"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                value={form.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>
          )}

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          {mode === "signup" && (
            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {mode === "login"
              ? loginMutation.isPending
                ? "Logging in..."
                : "Login"
              : signupMutation.isPending
                ? "Signing up..."
                : "Sign Up"}
          </Button>

          {apiError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-600 text-sm">
                {(apiError as Error)?.message || "An error occurred"}
              </p>
            </div>
          )}
        </form>

        <div className="text-center">
          <button
            onClick={toggleMode}
            className="text-blue-600 hover:underline text-sm"
            disabled={isLoading}
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </button>
        </div>
      </motion.div>
    );
  }
);

AuthCard.displayName = "AuthCard";
