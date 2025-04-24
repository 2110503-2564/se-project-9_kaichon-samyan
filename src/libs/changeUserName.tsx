export default async function changeUserName(newUsername:string,token: any) {
    console.log("test");
    const response = await fetch(`https://be-se.vercel.app/api/v1/auth/addUsername`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        newUsername:newUsername
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