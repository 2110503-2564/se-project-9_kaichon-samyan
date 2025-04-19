export default async function bookReservation(HotelId: any, checkIn:any, checkOut: any, token: any) {
  const response = await fetch(`https://be-se.vercel.app/api/v1/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      hotelId: HotelId,
      checkIn: checkIn,
      checkOut: checkOut
    }),
    cache: "no-store"
  });

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message);
  }

  return data;
}