"use client";
import deleteBooking from "@/libs/deleteBooking";
import editBooking from "@/libs/editBooking";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DateReserve from "./DateReserve";
import { Dayjs } from "dayjs";

export default function ReservationList({
  reservation,
  onDelete,
  onEdit,
}: {
  reservation: any;
  onDelete: Function;
  onEdit: Function;
}) {
  const userSession = useSession();
  const [showedit, setShowedit] = useState<boolean>(false);
  const [editBookDateIn, setEditBookDateIn] = useState<Dayjs | null>(null);
  const [editBookDateOut, setEditBookDateOut] = useState<Dayjs | null>(null);
  const [error, setError] = useState<string | null>(null);

  function deleteBookingHandler() {
    deleteBooking(reservation._id, userSession.data?.user.token);
    onDelete(reservation);
  }

  function editBookingHandler() {
    setShowedit(true);
  }

  function confirmEditBooking() {
    if (!editBookDateIn || !editBookDateOut) {
      return;
    }

    
    editBooking(
      reservation._id,
      userSession.data?.user.token,
      editBookDateIn?.format("YYYY-MM-DD"),
      editBookDateOut?.format("YYYY-MM-DD")
    )
    .then(() => {
        onEdit(reservation, editBookDateIn?.format("YYYY-MM-DD"), editBookDateOut?.format("YYYY-MM-DD"));
        setShowedit(false);
      })
      .catch((error) => {
        const errormsg = error instanceof Error ? error.message : String(error);
        setError(errormsg);
      });
  }

  return (
    <div className="relative rounded-lg shadow-lg bg-white px-5 mt-5 py-2 my-2 text-black w-[450px] h-auto ml-5 border-[0.1px] border-grey-200">
      <div className="flex justify-end">
        <button
          className="rounded-md bg-[#ff9393] hover:bg-red-200 px-3 py-2 shadow-sm text-[#ff0000] mt-2 mb-2 font-semibold"
          onClick={deleteBookingHandler}
        >
          Remove Booking
        </button>
      </div>
      <p className="text-md">Hotel name: {reservation.hotel.hotelName}</p>
      <p className="text-md">Address: {reservation.hotel.address}</p>
      <p className="text-md">Website: {reservation.hotel.website}</p>
      <p className="text-md">Tel: {reservation.hotel.tel}</p>
      <p className="text-md">User: {reservation.user.name}</p>
      <p className="text-md">Email: {reservation.user.email}</p>
      <p className="text-md">CheckIn Date: {reservation.checkIn}</p>
      <p className="text-md">CheckOut Date: {reservation.checkOut}</p>
      <div>
        <button
          className="block rounded-md bg-[#b6d5ff] hover:bg-blue-200 px-3 py-2 shadow-sm mb-3 text-[#241cb2] mt-2 font-semibold"
          onClick={editBookingHandler}
        >
          Edit Date
        </button>
        {showedit && (
          <div className="pb-4">
            <DateReserve
              onDateChange={(value: Dayjs) => setEditBookDateIn(value)}
            />
            <DateReserve
              onDateChange={(value: Dayjs) => setEditBookDateOut(value)}
            />
            {editBookDateIn && editBookDateOut ? (
              <button
                onClick={confirmEditBooking}
                className="p-2 m-2 bg-[#b6ffd5] hover:bg-green-200 rounded-lg text-[#1c794c] font-semibold"
              >
                Confirm
              </button>
            ) : (
              <button
                className="p-2 m-2 bg-[#b6ffd5] hover:cursor-not-allowed hover:bg-green-200 rounded-lg text-[#1c794c] font-semibold"
                disabled
              >
                Confirm
              </button>
            )}
            {error && <h1 className="text-red-600">{error}</h1>}
          </div>
        )}
      </div>
    </div>
  );
}