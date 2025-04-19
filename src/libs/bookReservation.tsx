export default async function bookReservation(HotelId: any, date:any, token: any) {
  const response = await fetch(`https://frontend-backend-api-45mm.vercel.app/api/v1/companies/${HotelId}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      sessionDate: date
    }),
    cache: "no-store"
  });

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message);
  }

  return data;
}