import CardPanel from "@/components/CardPanel";
import VenueCatalog from "@/components/VenueCatalog";
import getVenues from "@/libs/getVenues";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default async function Venue() {

    const venues = await getVenues()

    return(
        <main>
            <h1 className="text-xl font-medium text-center mb-5 mt-5">Select Your Venue</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <VenueCatalog venuesJson={venues}/>
            </Suspense>
        </main>
    );
}