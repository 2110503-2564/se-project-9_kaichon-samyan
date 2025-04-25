export default async function getAllUsers(token:string) {
    const response = await fetch('https://be-se.vercel.app/api/v1/auth/getAllUser', {
      method: "GET",
      headers: {
          authorization: `Bearer ${token}`,
      },
  });
  
    if(!response.ok) {
      throw new Error('Cannot fetch');
    }
  
    return await response.json();
  }