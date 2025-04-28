"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl space-y-6"
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-800 ">Sign In</h1>

        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
            Email or Username
          </label>
          <input
            id="email"
            type="text"
            placeholder="your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center">Invalid credentials</p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-xl transition"
        >
          Sign In
        </button>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/api/auth/signup" className="text-blue-700 underline hover:text-blue-900">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
