"use client";
import userSignUp from "@/libs/userSignUp";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState<string|null>(null);

  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if(password !== confirmPassword) {
      setError('Password Does not match');
      return;
    }

    if(!email || !password || !confirmPassword || !tel) {
      setError('Please provide all fields');
      return;
    }

    userSignUp(name, email, password, tel)
    .then(() => {
      return signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/"
      });
    })
    .then((res) => {
      if (res?.error) {
        setError("Invalid credentials");
      }
    })
    .catch((error) => {
      setError(error instanceof Error ? error.message : String(error));
    });

  }

  return (
    <div className="w-full flex justify-center p-9">
      <form className="w-[300px]" onSubmit={onSubmit}>
        <h1 className="text-4xl font-bold mb-5 text-center">Sign Up</h1>
        <label className="block text-xl mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="block mb-2 p-3 bg-gray-50 rounded-xl border border-black w-full"
          type="text"
          id="username"
          placeholder="John doe"
          value={name}
          onChange={(e) => setName(e.target.value)}  
        />
        <label className="block text-xl mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="block mb-2 p-3 bg-gray-50 rounded-xl border border-black w-full"
          type="email"
          id="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block text-xl mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="block mb-2 p-3 bg-gray-50 rounded-xl border border-black w-full"
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  
        />
        <label className="block text-xl mb-2" htmlFor="confirmpassword">
          Confirm Password
        </label>
        <input
          className="block mb-2 p-3 bg-gray-50 rounded-xl border border-black w-full"
          type="password"
          placeholder="••••••••"
          id="confirmpassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label className="block text-xl mb-2" htmlFor="telephone">
          Telephone
        </label>
        <input
          className="block mb-5 p-3 bg-gray-50 rounded-xl border border-black w-full"
          type="text"
          id="telephone"
          placeholder="000-000-0000"
          value={tel}
          onChange={(e) => setTel(e.target.value)}  
        />
        {
          error && (
            <h1 className="text-lg mb-5 text-red-600">{error}</h1>
          )
        }
        <div className="flex justify-center w-full">
          <button
            className=" text-2xl font-semibold bg-blue-300 hover:bg-blue-400 p-2 px-4 rounded-lg"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
