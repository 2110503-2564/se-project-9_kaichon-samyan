export default async function bookSession(companyId: any, score:any, comment:any ,token: any) {
    const response = await fetch(`http://localhost:5000/api/v1/hotels/${companyId}/rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        score:score,
        comment:comment
      }),
      cache: "no-store"
    });
  
    const data = await response.json();
  
    if(!response.ok) {
      throw new Error(data.message);
    }
  
    return data;
  }