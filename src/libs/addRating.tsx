export default async function addRating(companyId: any, score:any, comment:any ,token: any) {
    console.log("test");
    const response = await fetch(`http://localhost:5000/api/v1/hotels/${companyId}/rating`, {
      method: "PUT",
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
    
    console.log("here");
    const data = await response.json();
    console.log(data);
  
    if(!response.ok) {
      throw new Error(data.message);
    }
  
    return data;
  }