'use client'
import getAllReservations from "@/libs/getAllReservations"
import ReservationList from "@/components/ReservationList";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Reservation {
  id: string;
  reservationDate: string;
  // Add other properties as needed
}

export default function ReservationsPage() {
  const { data: userSession } = useSession();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    setReservations(prevState => prevState.filter(reservation => reservation.id !== item.id));
  }
  
  function onEdit(item: Reservation, editBookDate: string) {
    setReservations(prevState => 
      prevState.map(res => 
        res.id === item.id 
          ? { ...res, reservationDate: `${editBookDate}T00:00:00.000Z` } 
          : res
      )
    );
  }

  console.log(reservations);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "50px",
      justifyContent: "center", // ทำให้ item ในแถวสุดท้ายชิดซ้าย
    }}>
      {reservations.length !== 0 ? (
        reservations.map((reservation) => (
          <ReservationList 
            key={reservation.id} 
            reservation={reservation} 
            onDelete={onDelete} 
            onEdit={onEdit} 
          />
        ))
      ) : (
        <h1>No Reservations Booking</h1>
      )}
    </main>
  );
}