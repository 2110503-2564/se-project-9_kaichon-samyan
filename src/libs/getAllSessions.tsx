export default async function getAllSessions(token:string|null|undefined){
  const response = await fetch('https://frontend-backend-api-45mm.vercel.app/api/v1/session', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    cache: "no-store"
  });


  if(!response.ok) {
    throw new Error('failed to fetch');
  }

  return await response.json();
}