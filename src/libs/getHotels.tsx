export default async function getHotels() {
  const response = await fetch('https://be-se.vercel.app/api/v1/hotels', { cache: "no-store" });

  if(!response.ok) {
    throw new Error('Cannot fetch');
  }

  return await response.json();
}