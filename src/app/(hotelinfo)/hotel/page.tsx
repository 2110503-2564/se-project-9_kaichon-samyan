import HotelList from "@/components/HotelList";
import getHotels from "@/libs/getHotels";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default async function Company() {

    const hotels = await getHotels();

    return(
        <main>
            <h1 className="text-xl font-medium text-center mb-5 mt-5">Select Hotels</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <HotelList hotelJson={hotels}/>
            </Suspense>
        </main>
    );
}