export default async function getHotel(id:string) {
  const response = await fetch(`https://be-se.vercel.app/api/v1/hotels/${id}`, {
    cache: "no-store"
  });

  if(!response.ok) {
    throw new Error(await response.json());
  }

  return await response.json();
}