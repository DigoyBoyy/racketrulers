"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTRPC } from "@/lib/trpc/client";
import { useMutation } from "@tanstack/react-query";

export default function CreateAdminUserPage() {
  const router = useRouter();
  const trpc = useTRPC();
  const [error, setError] = useState<string | null>(null);

  const createUser = useMutation(trpc.auth.createAdminUser.mutationOptions());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUser.mutateAsync({ name, email, password });
      router.push("/dashboard/admin");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Admin User</h1>
        <p className="mt-1.5 text-muted-foreground">
          Create a new administrator account for coaches and organizers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {error && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Full name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="admin@example.com"
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
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={createUser.isPending}
          >
            {createUser.isPending ? "Creating..." : "Create Admin User"}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}