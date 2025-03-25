export default async function deleteBooking(sessionId: any, token:any) {
  const response = await fetch(`http://frontend-backend-api-45mm.vercel.app/api/v1/session/${sessionId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message);
  }

  return data;
}