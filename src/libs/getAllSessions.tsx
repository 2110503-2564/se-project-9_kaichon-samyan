export default async function getAllSessions(token:string|null|undefined){
  const response = await fetch('http://localhost:5000/api/v1/session', {
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