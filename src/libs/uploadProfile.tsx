export default async function uploadProfilePic(token: string) {
    const response = await fetch("https://be-se.vercel.app/api/v1/auth/uploadProfilePic", {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
  
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Can't get user profile - Status: ${response.status}, Response: ${errorText}`);
    }
  
    return await response.json();
  }