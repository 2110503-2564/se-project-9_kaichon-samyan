'use client'
import getAllReservations from "@/libs/getAllReservations"
import ReservationList from "@/components/ReservationList";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Reservation {
  _id: string;
  checkIn: string;
  checkOut: string;
  hotel: {
    hotelName: string;
    address: string;
    website: string;
    tel: string;
  };
  user: {
    name: string;
    email: string;
  };
}

export default function ReservationsPage() {
  const { data: userSession } = useSession();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (userSession?.user.token) {
      getAllReservations(userSession.user.token)
        .then((res) => {
          setReservations(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userSession]);

  function onDelete(item: Reservation) {
    setReservations(prevState =>
      prevState.filter(reservation => reservation._id !== item._id)
    );
    router.refresh();
  }

  function onEdit(item: Reservation, checkIn: string, checkOut: string) {
    setReservations(prevState =>
      prevState.map(res =>
        res._id === item._id
          ? {
              ...res,
              checkIn: `${checkIn}T00:00:00.000Z`,
              checkOut: `${checkOut}T00:00:00.000Z`,
            }
          : res
      )
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-600 py-12 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mt-7 ml-2 text-center text-gray-100 font-serif">Hotel Reservations</h1>
        <hr className="border-t-3 border-gray-800 mb-10 w-[200px] mx-auto" />

        <div className="flex flex-wrap gap-10 justify-center">
          {reservations.length !== 0 ? (
            reservations.map((reservation) => (
              <ReservationList
                key={reservation._id}
                reservation={reservation}
                onDelete={onDelete}
                onEdit={onEdit}
              /> 
            ))
          ) : (
            <p className="text-lg text-gray-500 text-center">
              You don't have any reservations yet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
