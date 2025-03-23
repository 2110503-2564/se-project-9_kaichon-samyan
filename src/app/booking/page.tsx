'use client'
import DateReserve from "@/components/DateReserve";
import { SelectChangeEvent, TextField } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "../../../interface";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";

export default function Booking() {
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems)

    const [nameLastname, setNameLastname] = useState<string>("")
    const [tel, setTel] = useState<string>("")
    const [venue, setVenue] = useState<string>("")
    const [bookDate, setBookDate] = useState<Dayjs|null>(null)

    const dispatch = useDispatch<AppDispatch>()

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //console.log("namechange")
        setNameLastname(event.target.value)
    }

    const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //console.log("telchange")
        setTel(event.target.value)
    }

    const handleVenueChange = (event: SelectChangeEvent) => {
        //console.log("venuechange")
        setVenue(event.target.value)
    }

    const makeReservation = () => {
        if(nameLastname && tel && venue && bookDate) {
            // console.log("here1")
            const item:BookingItem = {
                nameLastname: nameLastname,
                tel: tel,
                venue: venue,
                bookDate: dayjs(bookDate).format("YYYY/MM/DD")
            }
            dispatch(addBooking(item))
            // console.log(item)
            // console.log(bookItems.length)
            // console.log(...bookItems)
        }
        // console.log("here2")
    }

    return (
        <main className="w-[100%] flex flex-col items-center">
            <h1 className="mt-8 text-2xl font-medium">Booking Venue</h1>
            <TextField variant="standard" name="Name-Lastname" label="Name-Lastname" sx={{ height: '2em', width: '200px', marginTop: '1rem' }} value={nameLastname} onChange={handleNameChange}/>
            <TextField variant="standard" name="Contact-number" label="Contact-number" sx={{ height: '2em', width: '200px', marginTop: '1rem' }} value={tel} onChange={handleTelChange}/>
            <Select variant="standard" id="venue" sx={{ height: '2em', width: '200px', marginTop: '2rem' }} value={venue || ""} onChange={handleVenueChange}>
                <MenuItem value='Bloom'>The Bloom Pavilion</MenuItem>
                <MenuItem value='Spark'>Spark Space</MenuItem>
                <MenuItem value='GrandTable'>The Grand Table</MenuItem>
            </Select>
            <DateReserve onDateChange={(value:Dayjs)=>setBookDate(value)}/>
            <Button variant="outlined" name="Book Venue" sx = {{ marginTop:"1.5rem" }} onClick={makeReservation}>Book Venue</Button>
        </main>
    );
}