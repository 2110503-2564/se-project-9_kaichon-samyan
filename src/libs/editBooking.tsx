export default async function editBooking(sessionId: any, token:any, checkIn:any, checkOut:any) {
  const response = await fetch(`https://be-se.vercel.app/api/v1/sessions/${sessionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      checkIn: checkIn,
      checkOut: checkOut
    })
  });

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message);
  }

  return data;
}