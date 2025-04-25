"use client";
import changeUserName from "@/libs/changeUserName";
import userSignUp from "@/libs/userSignUp";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { UserProfile } from "../../../../../interface";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [userName,setUserName] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password does not match");
      return;
    }

    if (!email || !password || !confirmPassword || !tel) {
      setError("Please provide all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be longer than 6 characters");
      return;
    }


     userSignUp(name, email, password, tel)
     .then(async(data)=>{
      await changeUserName(userName,data.token)
     })
      .then(() => {
        signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/",
        });
      })
      .catch((error) => {
        setError(error instanceof Error ? error.message : String(error));
      });

     
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl space-y-6"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800">Sign Up</h1>

        <div>
          <label className="block text-lg mb-1 text-gray-700">Username</label>
          <input
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            placeholder="John Doe"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-lg mb-1 text-gray-700">Name</label>
          <input
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-lg mb-1 text-gray-700">Email</label>
          <input
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-lg mb-1 text-gray-700">Password</label>
          <input
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-lg mb-1 text-gray-700">Confirm Password</label>
          <input
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-lg mb-1 text-gray-700">Telephone</label>
          <input
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            placeholder="000-000-0000"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-red-600 font-medium text-center">{error}</div>
        )}

        <div className="flex justify-center">
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white text-lg font-semibold py-2 px-6 rounded-lg transition"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
