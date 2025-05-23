'use client'
import DateReserve from "@/components/DateReserve";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import bookReservation from "@/libs/bookReservation";

export default function Booking() {
    const searchParams = useSearchParams();
    const hotelId = searchParams.get('hotelId');

    console.log(hotelId);

    const session = useSession();
    const [error, setError] = useState<string|null>();
    const [checkInDate, setCheckInDate] = useState<string|null>();
    const [checkOutDate, setCheckOutDate] = useState<string|null>();
    const router = useRouter();

    const setCheckIn = (value:Dayjs) => {
        setCheckInDate(dayjs(value).format("YYYY-MM-DD"));
    }
    
    const setCheckOut = (value:Dayjs) => {
        setCheckOutDate(dayjs(value).format("YYYY-MM-DD"));
    }

    async function bookingSession() {
        if(!checkInDate || !checkOutDate) {
            setError('Nodate.');
            return;
        }
        
        try {
            await bookReservation(hotelId, checkInDate, checkOutDate, session.data?.user.token);
            router.push('/reservation');
        } catch (error) {
            const errormsg = error instanceof Error ? error.message : String(error);
            setError(errormsg);
        }
    }

    return (
        <main className="w-full flex flex-col items-center">
            <div className="w-[40%] h-[400px] flex flex-col items-center rounded-lg shadow-lg bg-white 
            px-5 mt-5 py-2 my-2 text-black ml-5 border-[0.1px] border-grey-200">
            <h1 className="mt-8 text-2xl font-medium ">Select Session Date</h1>
            <DateReserve onDateChange={(value:Dayjs)=>setCheckIn(value)}/>
            <DateReserve onDateChange={(value:Dayjs)=>setCheckOut(value)}/>
            <button className="mt-10 p-4block bg-[#b6d5ff] hover:bg-blue-200 px-3 py-2 shadow-sm mb-5 text-[#241cb2] font-semibold text-xl rounded-xl" onClick={bookingSession}>Booking</button>
            {
                error && (
                    <h1 className="text-2xl text-red-700">{error}</h1>
                )
            }
            </div>
        </main>
    );
}