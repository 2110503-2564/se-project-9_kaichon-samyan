//"https://a08-venue-explorer-backend.vercel.app/api/v1/auth/me"
//"http://localhost:5050/api/v1/auth/me"

export default async function getUserProfile(token:string) {
    const response = await fetch("http://localhost:5050/api/v1/auth/me", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    })

    if(!response.ok) {
        throw new Error("Failed to fetch user profile")
    }
    return await response.json()
}