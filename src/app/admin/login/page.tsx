"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Lock, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid credentials.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Network error while signing in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory flex flex-col justify-between p-6 sm:p-12 arch-grid-dark">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bronze hover:text-ivory transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>RETURN TO PUBLIC WEBSITE</span>
        </Link>
      </div>

      <div className="mx-auto w-full max-w-md border border-ivory/15 bg-charcoal-light/90 p-8 sm:p-12 shadow-2xl space-y-8">
        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center border border-bronze text-bronze">
            <Lock className="h-5 w-5" />
          </div>
          <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-bronze">
            KOLS ARCHITECTS · STUDIO CMS
          </p>
          <h1 className="font-serif text-3xl text-ivory">
            Administrator Sign In
          </h1>
          <p className="text-xs text-concrete">
            Protected content management portal for projects, services,
            enquiries, and SEO configuration.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="border border-red-500/60 bg-red-950/60 px-4 py-3 text-xs text-red-200"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/80 mb-2"
            >
              Administrator Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kolsarchitects.com"
              className="w-full border border-ivory/20 bg-charcoal px-4 py-3.5 text-sm text-ivory focus:border-bronze focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/80 mb-2"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              className="w-full border border-ivory/20 bg-charcoal px-4 py-3.5 text-sm text-ivory focus:border-bronze focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-bronze px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-ivory disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>AUTHENTICATING...</span>
              </>
            ) : (
              <span>ACCESS STUDIO DASHBOARD</span>
            )}
          </button>
        </form>

        <div className="border-t border-ivory/10 pt-5 flex items-center gap-2.5 text-[11px] text-concrete">
          <ShieldCheck className="h-4 w-4 text-bronze shrink-0" />
          <span>
            Authenticated via signed HTTP-only session cookie &amp; server
            environment credentials.
          </span>
        </div>
      </div>

      <div className="text-center font-mono text-[10px] tracking-[0.2em] uppercase text-concrete">
        © KOLS ARCHITECTS · PRIVATE ADMINISTRATION PORTAL
      </div>
    </div>
  );
}
