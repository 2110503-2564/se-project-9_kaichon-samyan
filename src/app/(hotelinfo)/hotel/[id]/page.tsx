import getHotel from "@/libs/getHotel";
import { Hotel, Rating } from "../../../../../interface";
import HotelDetailClient from "@/components/HotelDetails";

export default async function HotelDetailPage({ params }: { params: { id: string } }) {
    const HotelDetails = await getHotel(params.id);
    const HotelDetailsData: Hotel = HotelDetails.data;

    return (
        <main>
            <HotelDetailClient hotel={HotelDetailsData}></HotelDetailClient>
        </main>
    );
}
