"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const API_BASE = "http://localhost:5000/api/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Registration failed",
          description: data.error || "Please check your details.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Registration successful",
        description: "You can now log in.",
      });

      router.push("/auth/login");
    } catch (err) {
      toast({
        title: "Registration error",
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
        onSubmit={handleRegister}
        className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow"
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <Input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Choose a username"
            required
            minLength={3}
            maxLength={30}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">First Name (optional)</label>
          <Input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First name"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Last Name (optional)</label>
          <Input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last name"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Company (optional)</label>
          <Input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
        <div className="text-sm text-center">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
}