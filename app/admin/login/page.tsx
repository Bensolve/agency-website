"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Login failed.");
      return;
    }
    router.push(next);
    router.refresh();
  }

  const fieldCls =
    "w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink";

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-sm border border-line bg-paper p-8"
      >
        <p className="eyebrow">Admin</p>
        <h1 className="display-md mt-2">Sign in</h1>

        <label className="mt-8 block">
          <span className="eyebrow mb-2 block">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldCls}
            autoComplete="email"
          />
        </label>

        <label className="mt-4 block">
          <span className="eyebrow mb-2 block">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldCls}
            autoComplete="current-password"
          />
        </label>

        {error && (
          <p className="mt-4 rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading} className="mt-6 w-full">
          {loading ? "Signing in…" : "Sign in"}
        </Button>

        <p className="mt-4 text-center text-xs text-ink-soft">
          Dev login: <code>admin@example.com</code> /{" "}
          <code>ChangeMe123!</code>
        </p>
      </form>
    </div>
  );
}