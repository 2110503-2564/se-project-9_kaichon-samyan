export default async function getAllReservations(token: string | null | undefined) {
  const response = await fetch('https://be-se.vercel.app/api/v1/sessions', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error('failed to fetch');
  }

  return await response.json();
}