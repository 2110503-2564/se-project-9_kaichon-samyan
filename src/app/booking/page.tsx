'use client'
import DateReserve from "@/components/DateReserve";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import bookSession from "@/libs/bookSession";
import { useRouter } from "next/navigation";

export default function Booking() {
    const searchParams = useSearchParams();
    const companyId = searchParams.get('companyId');
    const session = useSession();
    const [error, setError] = useState<string|null>();
    const [date, setDate] = useState<string|null>();
    const router = useRouter();

    function setBookDate(value:Dayjs) {
        setDate(dayjs(value).format("YYYY-MM-DD"));
    }

    function bookingSession() {
        if(!date) {
            setError('Nodate.');
            return;
        }

        bookSession(companyId, date, session.data?.user.token)
        .then(() => {
            router.push('/session');
        })
        .catch((error) => {
            const errormsg = error instanceof Error ? error.message : String(error);
            console.log(errormsg);
            setError(errormsg);
        });
    }

    return (
        <main className="w-[100%] flex flex-col items-center">
            <h1 className="mt-8 text-2xl font-medium">Booking Interview Session</h1>
            <DateReserve onDateChange={(value:Dayjs)=>setBookDate(value)}/>
            <button className="mt-10 bg-lime-400 p-4 hover:bg-lime-500 text-xl rounded-xl" onClick={bookingSession}>Booking</button>
            {
                error && (
                    <h1 className="text-2xl text-red-700">{error}</h1>
                )
            }
        </main>
    );
}