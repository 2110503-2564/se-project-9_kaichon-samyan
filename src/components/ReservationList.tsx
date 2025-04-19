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
    <div className="relative rounded-lg shadow-lg bg-white px-5 mt-6 py-2 my-2 text-black w-[450px] h-auto ml-5 border-[0.1px] border-grey-200">
      <div className="flex justify-end">
        <button
        className="rounded-md bg-gray-200 text-gray-500 px-3 py-2 shadow-sm mt-2 mb-2 font-semibold transition-all duration-300 hover:bg-red-500 hover:text-black hover:scale-105"          onClick={deleteBookingHandler}
        >
          Remove Booking
        </button>
      </div>
        <p className="text-md">
          <span className="font-semibold">Hotel name:</span>{' '}
          <span className="font-normal">{reservation.hotel.hotelName}</span>
        </p>
        <p className="text-md">
          <span className="font-semibold">Address:</span>{' '}
          <span className="font-normal">{reservation.hotel.address}</span>
        </p>
        <p className="text-md">
          <span className="font-semibold">Website:</span>{' '}
          <span className="font-normal">{reservation.hotel.website}</span>
        </p>
        <p className="text-md">
          <span className="font-semibold">Tel:</span>{' '}
          <span className="font-normal">{reservation.hotel.tel}</span>
        </p>
        <p className="text-md">
          <span className="font-semibold">User:</span>{' '}
          <span className="font-normal">{reservation.user.name}</span>
        </p>
        <p className="text-md">
          <span className="font-semibold">Email:</span>{' '}
          <span className="font-normal">{reservation.user.email}</span>
        </p>
        <p className="text-md">
          <span className="font-semibold">CheckIn Date:</span>{' '}
          <span className="font-normal">{reservation.checkIn}</span>
        </p>
        <p className="text-md">
          <span className="font-semibold">CheckOut Date:</span>{' '}
          <span className="font-normal">{reservation.checkOut}</span>
        </p>

      <div>
        <button
          className="block rounded-md bg-gray-200 text-gray-500 px-3 py-2 shadow-sm mb-3 mt-2 font-semibold transition-all duration-300 hover:bg-blue-500 hover:text-black hover:scale-105"
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
                className="p-2 m-2 rounded-md bg-green-500 text-black font-semibold transition-all duration-300 hover:scale-105"
              >
                Confirm
              </button>
            ) : (
              <button
                className="p-2 m-2 rounded-md bg-gray-300 text-gray-700 font-semibold"
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