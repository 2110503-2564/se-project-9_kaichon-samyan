'use client'
import getAllSessions from "@/libs/getAllSessions"
import SessionList from "@/components/SessionList";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Session {
  id: string;
  sessionDate: string;
  // Add other properties as needed
}

export default function SessionsPage() {
  const { data: userSession } = useSession();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userSession?.user.token) {
      console.log("herer3222");
      getAllSessions(userSession.user.token)
      .then((res) => {
          setSessions(res.data);
          setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [userSession]);

  function onDelete(item: Session) {
    setSessions(prevState => prevState.filter(session => session.id !== item.id));
  }
  
  function onEdit(item: Session, editBookDate: string) {
    setSessions(prevState => 
      prevState.map(ss => 
        ss.id === item.id 
          ? { ...ss, sessionDate: `${editBookDate}T00:00:00.000Z` } 
          : ss
      )
    );
  }

  console.log(sessions);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      {sessions.length !== 0 ? (
        sessions.map((session) => (
          <SessionList 
            key={session.id} 
            session={session} 
            onDelete={onDelete} 
            onEdit={onEdit} 
          />
        ))
      ) : (
        <h1>No Sessions Booking</h1>
      )}
    </main>
  );
}