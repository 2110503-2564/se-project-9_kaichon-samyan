export default async function editPassword(token: any, oldPassword: any, newPassword: any) {
    if(!token) {
        throw new Error("No token found in session");
    }

    const response = await fetch("https://be-se.vercel.app/api/v1/auth/changepassword", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword
        })
    });
    
    const data = await response.json();
    
    if(!response.ok) {
        throw new Error(data.message);
    }
    
    return data;
}