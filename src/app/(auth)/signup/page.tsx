"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTRPC } from "@/lib/trpc/client";
import { useMutation } from "@tanstack/react-query";

type SignupRole = "coach" | "client";

export default function SignupPage() {
  const router = useRouter();
  const trpc = useTRPC();
  const [error, setError] = useState<string | null>(null);

  const [role, setRole] = useState<SignupRole>("coach");

  const signup = useMutation(trpc.auth.signup.mutationOptions());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const adminCode = formData.get("adminCode") as string | null;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (role === "coach" && !adminCode?.trim()) {
      setError("Admin code is required for coach signup");
      return;
    }

    try {
      await signup.mutateAsync({
        adminCode: adminCode ?? undefined,
        role: role === "coach" ? "ADMIN" : "CLIENT",
        name,
        email,
        password,
      });
      router.push("/login");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    }
  }

  return (
    // <div>
    //   <h1 className="text-2xl font-bold tracking-tight">Create an organizer / coach account</h1>
    //   <p className="mt-1.5 text-muted-foreground">
    //     You need an invite code to sign up. Players and spectators don&apos;t need an account.
    //   </p>

    //   <form onSubmit={handleSubmit} className="mt-8 space-y-4">
    //     {error && (
    //       <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
    //         {error}
    //       </div>
    //     )}
    //     <div className="space-y-2">
    //       <Label htmlFor="adminCode">Invite code</Label>
    //       <Input
    //         id="adminCode"
    //         name="adminCode"
    //         placeholder="e.g. RACK-2025-ALPHA"
    //         required
    //       />
    //     </div>
    //     <div className="space-y-2">
    //       <Label htmlFor="name">Name</Label>
    //       <Input id="name" name="name" placeholder="Your name" required />
    //     </div>
    //     <div className="space-y-2">
    //       <Label htmlFor="email">Email</Label>
    //       <Input
    //         id="email"
    //         name="email"
    //         type="email"
    //         placeholder="you@example.com"
    //         required
    //       />
    //     </div>
    //     <div className="space-y-2">
    //       <Label htmlFor="password">Password</Label>
    //       <Input
    //         id="password"
    //         name="password"
    //         type="password"
    //         minLength={8}
    //         required
    //       />
    //     </div>
    //     <div className="space-y-2">
    //       <Label htmlFor="confirmPassword">Confirm password</Label>
    //       <Input
    //         id="confirmPassword"
    //         name="confirmPassword"
    //         type="password"
    //         minLength={8}
    //         required
    //       />
    //     </div>
    //     <Button
    //       type="submit"
    //       className="w-full"
    //       disabled={signup.isPending}
    //     >
    //       {signup.isPending ? "Creating account..." : "Create account"}
    //     </Button>
    //     <p className="text-center text-sm text-muted-foreground">
    //       Already have an account?{" "}
    //       <Link href="/login" className="text-primary hover:underline">
    //         Sign in
    //       </Link>
    //     </p>
    //   </form>
    // </div>
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Choose how you want to sign up.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-1">
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => {
              setRole("coach");
              setError(null);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              role === "coach"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            Sign up as Coach
          </button>

          <button
            type="button"
            onClick={() => {
              setRole("client");
              setError(null);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              role === "client"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            Sign up as Client
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border bg-card p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            {role === "coach" ? "Coach account" : "Client account"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {role === "coach"
              ? "Coaches need an invite code to create an account."
              : "Clients can create an account to manage bookings and sessions."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {role === "coach" && (
            <div className="space-y-2">
              <Label htmlFor="adminCode">Admin Code</Label>
              <Input
                id="adminCode"
                name="adminCode"
                placeholder="e.g. RACK-2025-ALPHA"
                required={role === "coach"}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              minLength={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              minLength={8}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={signup.isPending}>
            {signup.isPending
              ? "Creating account..."
              : `Create ${role} account`}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
