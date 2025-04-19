export default async function deleteRating(hotelId: any, ratingId: any, token: any) {
  const response = await fetch(`http://localhost:5000/api/v1/hotels/${hotelId}/rating/${ratingId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    cache: "no-store"
  });
  
  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message);
  }

  return data;
}