export default async function addRating(HotelId: any, score:any, comment:any ,token: any, RatingId : any) {
    console.log("test");
    const response = await fetch(`https://be-se.vercel.app/api/v1/hotels/${HotelId}/rating/${RatingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        newScore:score,
        newComment:comment
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