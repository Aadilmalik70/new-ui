"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const API_BASE = "http://localhost:5000/api/auth";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  // Try to get verification_token from URL (?verification_token=...)
  const initialToken = searchParams.get("verification_token") || "";
  const [verificationToken, setVerificationToken] = useState(initialToken);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verification_token: verificationToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Verification failed",
          description: data.error || "Could not verify email.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setSuccess(true);
      toast({
        title: "Email verified",
        description: "Your email has been verified. You can now log in.",
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow"
      >
        <h2 className="text-2xl font-bold text-center">Verify Email</h2>
        {success ? (
          <div className="text-center text-green-600">
            Email verified! Redirecting to login...
          </div>
        ) : (
          <>
            <div>
              <label className="block mb-1 font-medium">Verification Token</label>
              <Input
                type="text"
                value={verificationToken}
                onChange={(e) => setVerificationToken(e.target.value)}
                placeholder="Paste your verification token"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </>
        )}
        <div className="text-sm text-center">
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Back to login
          </a>
        </div>
      </form>
    </div>
  );
}