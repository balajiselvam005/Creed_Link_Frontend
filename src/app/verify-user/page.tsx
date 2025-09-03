"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { resendVerificationEmail, verifyUser } from "../server/api/userRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useAuth();

  const [coolDown, setCoolDown] = useState(0);

  useEffect(() => {
    if (token) {
      setLoading(true);
      verifyUser(token)
        .then((res) => {
          setUser(res.data.data.user);
          setMessage("✅ Email verified! Logging you in...");
          setError(false);

          setTimeout(() => router.push("/"), 2000);
        })
        .catch(() => {
          setError(true);
          setMessage("❌ Verification failed. Please try resending the email.");
        })
        .finally(() => setLoading(false));
    }
  }, [token, setUser, router]);

  const handleResend = async () => {
    if (!email) {
      setMessage("Email not found. Please go back and login again.");
      return;
    }

    setLoading(true);
    try {
      const res = await resendVerificationEmail(email);
      setMessage(res.data.message);
      setCoolDown(30);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setMessage(
        axiosError.response?.data.message ||
          axiosError.message ||
          "Failed to resend email"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coolDown > 0) {
      const timer = setInterval(() => {
        setCoolDown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [coolDown]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-xl font-bold">Verify Your Email</h1>

      {loading && <p>⏳ Processing...</p>}
      {message && <p className="text-sm text-gray-500">{message}</p>}

      {(error || !token) && (
        <Button onClick={handleResend} disabled={loading || coolDown > 0}>
          {loading
            ? "Sending..."
            : coolDown > 0
              ? `Resend in ${coolDown}`
              : "Resend Email"}
        </Button>
      )}
    </div>
  );
}
