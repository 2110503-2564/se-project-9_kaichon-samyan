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
      className="relative w-full h-screen overflow-hidden cursor-pointer"
      onClick={() => setIndex(index + 1)}
    >
      <Image
        src={cover[index % 4]}
        alt="cover"
        fill
        priority
        className="object-cover w-full h-full transition-all duration-700 ease-in-out"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg">Hotel Booking</h1>
        <h3 className="text-2xl md:text-3xl  mt-4 font-light ">Book the Stay. Live the Story.</h3>
        <button
          className="mt-5 bg-white text-black font-medium text-lg md:text-xl py-3 px-8 rounded-full shadow-md hover:bg-green-800 hover:text-white transition duration-300"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/hotel");
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
