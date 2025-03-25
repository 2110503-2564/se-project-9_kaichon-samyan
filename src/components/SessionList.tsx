"use client";
import deleteBooking from "@/libs/deleteBooking";
import editBooking from "@/libs/editBooking";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DateReserve from "./DateReserve";
import { Dayjs } from "dayjs";

export default function SessoinList({
  session,
  onDelete,
  onEdit,
}: {
  session: any;
  onDelete: Function;
  onEdit: Function;
}) {
  const userSession = useSession();
  const [showedit, setShowedit] = useState<boolean>(false);
  const [editBookDate, setEditBookDate] = useState<Dayjs | null>(null);
  const [error, setError] = useState<string | null>(null);

  function deleteBookingHanler() {
    deleteBooking(session.id, userSession.data?.user.token);
    onDelete(session);
  }

  function editBookingHandler() {
    setShowedit(true);
  }

  function confirmEditBooking() {
    editBooking(
      session.id,
      userSession.data?.user.token,
      editBookDate?.format("YYYY-MM-DD")
    )
      .then(() => {
        onEdit(session, editBookDate?.format("YYYY-MM-DD"));
        setShowedit(false);
      })
      .catch((error) => {
        const errormsg = error instanceof Error ? error.message : String(error);
        setError(errormsg);
      });
  }

  return (
    <div className="bg-green-100 rounded px-5 mt-20 py-2 my-2 text-black">
      <p>Company name: {session.company.companyName}</p>
      <p>Address: {session.company.address}</p>
      <p>Website: {session.company.website}</p>
      <p>Tel: {session.company.tel}</p>
      <p>User: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <p>Session Date: {session.sessionDate}</p>
      <div>
        <button
          className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm mb-3 text-white"
          onClick={editBookingHandler}
        >
          Edit Date
        </button>
        {showedit && (
          <div className="pb-4">
            <DateReserve
              onDateChange={(value: Dayjs) => setEditBookDate(value)}
            />
            <button 
              onClick={confirmEditBooking}
              className="p-2 m-2 bg-blue-300 hover:bg-blue-400 rounded-lg"
            >Confirm</button>
            {error && <h1 className="text-red-600">{error}</h1>}
          </div>
        )}
        <button
          className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
          onClick={deleteBookingHanler}
        >
          Remove Booking
        </button>
      </div>
    </div>
  );
}
