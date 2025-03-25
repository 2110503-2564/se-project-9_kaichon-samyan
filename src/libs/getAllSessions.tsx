export default async function getAllSessions(token:string|null|undefined){
  const response = await fetch('http://frontend-backend-api-45mm.vercel.apps/api/v1/session', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });


  if(!response.ok) {
    throw new Error('failed to fetch');
  }

  return await response.json();
}