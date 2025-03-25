"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
  const cover = [
    "/img/cover.png",
    "/img/cover2.png",
    "/img/cover3.png",
    "/img/cover4.png",
  ];
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();
  
  return (
    <div 
      className="relative w-full h-screen overflow-hidden cursor-pointer margin-0"
      onClick={() => setIndex(index + 1)}
    >
      <Image 
        src={cover[index % 4]} 
        alt="cover" 
        fill 
        priority 
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50 p-4 mt-[-50px]">
        <h1 className="text-5xl md:text-7xl font-bold">Online Job Fair Registration</h1>
        <h3 className="text-xl md:text-3xl mt-2">Join on May 10th - 13th, 2022</h3>
        <button
          className="mt-6 bg-gray-200 text-black font-semibold text-lg md:text-xl py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/company");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}