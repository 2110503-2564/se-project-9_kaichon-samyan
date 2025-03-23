'use client'
import { useAppSelector } from "@/redux/store"
import { BookingItem } from "../../interface"
import { removeBooking } from "@/redux/features/bookSlice"
import { AppDispatch } from "@/redux/store"
import { useDispatch, UseDispatch } from "react-redux"

export default function BookingList() {
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()
    // console.log(bookItems.length)

    return (
        <>
        {
            bookItems.length == 0? 'No Venue Booking'
            : bookItems.map((bookingItem: BookingItem) => (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookingItem.venue + bookingItem.bookDate}>
                    <div className="text-xl">Name-Lastname: {bookingItem.nameLastname}</div>
                    <div className="text-md">Contact-Number: {bookingItem.tel}</div>
                    <div className="text-md">Venue Name: {bookingItem.venue}</div>
                    <div className="text-md">Booking Date: {bookingItem.bookDate}</div>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1
                    text-white shadow-sm" onClick={()=>dispatch(removeBooking(bookingItem))}>
                        Remove from List
                    </button>
                </div>
            ))
        }
        </>
    )
}