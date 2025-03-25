//"http://localhost:5050/api/v1/auth/login"
//"https://a08-venue-explorer-backend.vercel.app/api/v1/auth/login"

export default async function userLogIn(userEmail:string, userPassword:string) {
    const response = await fetch("https://frontend-backend-api-45mm.vercel.app/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        }),
    })

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.msg);
    }

    return data;
}
