'use client'
import getAllSessions from "@/libs/getAllSessions"
import SessoinList from "@/components/SessionList";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function(){
	// const session = await getServerSession(authOptions);
	// const userSessoins = await getAllSessions(session?.user.token);
	const userSession = useSession();
	const [sessions, setSessions] = useState();
	
	useEffect(() => {
		getAllSessions(userSession.data?.user.token)
		.then((res) => {
			setSessions(res.data);
		})

	}, [])

	if(!sessions) {
		return (
			<h1>Loading...</h1>
		)
	}

	function onDelete(item:any) {
		setSessions(prevState => prevState.filter(session => session.id !== item.id));
	}
	
	function onEdit(item:any, editBookDate:string) {
    setSessions(prevState => prevState.map(ss => 
        ss.id === item.id ? { ...ss, sessionDate: editBookDate + "T00:00:00.000Z" } : ss
    ));
}

	return(
		<main>
			{
				sessions.length !== 0 ? 
				sessions.map((session:object) => (
					<SessoinList session={session} key={session.id} onDelete={onDelete} onEdit={onEdit} />
				))
				:
				<h1>No Sessions Booking</h1>
			}
		</main>
	)
}