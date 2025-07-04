"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const API_BASE = "http://localhost:5000/api/auth";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Request failed",
          description: data.error || "Could not process request.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setSubmitted(true);
      toast({
        title: "Check your email",
        description:
          "If the email is registered, a password reset link has been sent.",
      });
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
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        {submitted ? (
          <div className="text-center text-green-600">
            If the email is registered, a password reset link has been sent.
          </div>
        ) : (
          <>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
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