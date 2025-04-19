'use client'
import getAllReservations from "@/libs/getAllReservations"
import ReservationList from "@/components/ReservationList";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { resourceLimits } from "worker_threads";
import { useRouter } from "next/navigation";

interface Reservation {
  _id: string;
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

  function onDelete(item: any) {
    setReservations(prevState => prevState.filter(reservation => reservation._id !== item._id))
    router.refresh();
  }
  
  function onEdit(item: any, checkIn: any, checkOut: any) {
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
            key={reservation._id} 
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