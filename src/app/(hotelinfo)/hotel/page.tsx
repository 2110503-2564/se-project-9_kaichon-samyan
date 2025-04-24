import HotelList from "@/components/HotelList";
import getHotels from "@/libs/getHotels";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default async function Company() {
    const hotels = await getHotels();

    return (
        <main
            className="relative py-10 px-4 sm:px-8 w-full mx-auto min-h-screen"
            style={{
                backgroundImage: "url('/img/bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
            <div className="relative z-10">
                <h1 className="text-4xl font-['Playfair_Display'] font-medium text-center ml-2 text-white drop-shadow-lg">
                    Select Hotels
                </h1>
                <hr className="border-t-3 border-gray-300 mb-8 w-[300px] mx-auto" />
                <Suspense fallback={<p>Loading...<LinearProgress /></p>}>
                    <HotelList hotelJson={hotels} />
                </Suspense>
            </div>
        </main>
    );
}
