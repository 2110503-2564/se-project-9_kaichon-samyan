'use client'
import { TextField } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import { Dayjs } from "dayjs";

export default function Booking() {
    function setBookDate(value:Dayjs) {
        
    }

    function bookingSession(e:any) {
        console.log('booking');
    }

    return (
        <main className="w-[100%] flex flex-col items-center">
            <h1 className="mt-8 text-2xl font-medium">Booking Interview Session</h1>
            <DateReserve onDateChange={(value:Dayjs)=>setBookDate(value)}/>
            <button className="mt-10 bg-lime-400 p-4 hover:bg-lime-500 text-xl rounded-xl" onClick={bookingSession}>Booking</button>
        </main>
    );
}