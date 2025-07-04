"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const API_BASE = "http://localhost:5000/api/auth";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  // Try to get reset_token from URL (?reset_token=...)
  const initialToken = searchParams.get("reset_token") || "";
  const [resetToken, setResetToken] = useState(initialToken);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset_token: resetToken, new_password: newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Reset failed",
          description: data.error || "Could not reset password.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setSuccess(true);
      toast({
        title: "Password reset",
        description: "Your password has been reset. You can now log in.",
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
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        {success ? (
          <div className="text-center text-green-600">
            Password reset successful! Redirecting to login...
          </div>
        ) : (
          <>
            <div>
              <label className="block mb-1 font-medium">Reset Token</label>
              <Input
                type="text"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                placeholder="Paste your reset token"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">New Password</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
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