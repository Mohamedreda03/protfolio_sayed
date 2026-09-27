"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLoginAction } from "@/app/actions/admin";
import { Lock, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await adminLoginAction(formData);

    if (result.success) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError(result.error || "Authentication failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col items-center justify-center p-4 relative font-sans">
      <div className="w-full max-w-sm space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0066FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-xl space-y-6">
          <div className="space-y-1">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] mb-4 shadow-xs">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              Admin Console
            </h1>
            <p className="text-xs text-slate-500">
              Sign in with your Appwrite admin credentials
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue="admin@portfolio.dev"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                defaultValue="admin12345"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#0066FF] hover:bg-[#0052CC] text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0066FF]/25 disabled:opacity-60 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{loading ? "Authenticating..." : "Access Console"}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 space-y-1 font-mono">
            <span className="text-slate-900 font-bold block">Local Demo Credentials:</span>
            <p>Email: <code className="text-[#0066FF]">admin@portfolio.dev</code></p>
            <p>Password: <code className="text-slate-800">admin12345</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
