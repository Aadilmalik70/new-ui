"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { authFetch, clearTokens } from "@/lib/auth";

const API_BASE = "http://localhost:5000/api/auth";

type User = {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  is_verified?: boolean;
};

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Change password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  // Fetch user info on mount
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const res = await authFetch(`${API_BASE}/me`);
        if (res.status === 401) {
          clearTokens();
          router.push("/auth/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);
        setForm({
          username: data.user.username,
          email: data.user.email,
          first_name: data.user.first_name || "",
          last_name: data.user.last_name || "",
          company: data.user.company || "",
        });
      } catch {
        toast({
          title: "Error",
          description: "Failed to load profile.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await authFetch(`${API_BASE}/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Update failed",
          description: data.error || "Could not update profile.",
          variant: "destructive",
        });
        setUpdating(false);
        return;
      }
      setUser(data.user);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated.",
      });
    } catch {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangingPassword(true);
    try {
      const res = await authFetch(`${API_BASE}/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Password change failed",
          description: data.error || "Could not change password.",
          variant: "destructive",
        });
        setChangingPassword(false);
        return;
      }
      toast({
        title: "Password changed",
        description: "Your password has been updated.",
      });
      setCurrentPassword("");
      setNewPassword("");
    } catch {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = () => {
    clearTokens();
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>
          <p className="mb-4">You are not logged in.</p>
          <Button onClick={() => router.push("/auth/login")}>Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg space-y-8 rounded-lg bg-white p-8 shadow">
        <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <Input
              name="username"
              value={form.username || ""}
              onChange={handleChange}
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
              value={form.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <Input
              name="first_name"
              value={form.first_name || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <Input
              name="last_name"
              value={form.last_name || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Company</label>
            <Input
              name="company"
              value={form.company || ""}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full" disabled={updating}>
            {updating ? "Updating..." : "Update Profile"}
          </Button>
        </form>
        <hr className="my-6" />
        <form onSubmit={handleChangePassword} className="space-y-4">
          <h3 className="text-lg font-semibold">Change Password</h3>
          <div>
            <label className="block mb-1 font-medium">Current Password</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={changingPassword}>
            {changingPassword ? "Changing..." : "Change Password"}
          </Button>
        </form>
        <hr className="my-6" />
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}