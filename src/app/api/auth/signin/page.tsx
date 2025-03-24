"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default async function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string|null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if(res?.error) {
      setError('Invalid credentials');
    }
  }

  return (
    <div className="w-full flex justify-center p-9">
      <form className="w-[300px]" onSubmit={onSubmit}>
        <h1 className="text-4xl font-bold mb-5 text-center">Sign In</h1>
        <label className="block text-xl mb-2" htmlFor="">
          Email
        </label>
        <input
          className="block mb-2 p-3 bg-gray-50 rounded-xl border border-black w-full"
          type="text"
          id="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  
        />
        <label className="block text-xl mb-2" htmlFor="">
          Password
        </label>
        <input
          className="block mb-5 p-3 bg-gray-50 rounded-xl border border-black w-full"
          type="password"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center w-full pb-8">
          <button
            className=" text-2xl font-semibold bg-blue-300 hover:bg-blue-400 p-2 px-4 rounded-lg"
            type="submit"
          >
            Sign in
          </button>
        </div>
        <h3 className="text-sm ml-3">Don't have an account? <Link href={'/api/auth/signup'} className="underline text-blue-800">Sign up</Link></h3>
      </form>
    </div>
  );
}
