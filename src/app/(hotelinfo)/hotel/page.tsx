import HotelList from "@/components/HotelList";
import getHotels from "@/libs/getHotels";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default async function Company() {

    const hotels = await getHotels();

    return (
        <main className="py-10 px-4 sm:px-8 w-full mx-auto ">
            <h1 className="text-4xl font-['Playfair_Display'] font-medium text-center ml-2 ">Select Hotels</h1>
            <hr className="border-t-3 border-gray-800 mb-8 w-[300px] mx-auto" />
            <Suspense fallback={<p>Loading...<LinearProgress /></p>}>
                <HotelList hotelJson={hotels} />
            </Suspense>
        </main>
    );
}