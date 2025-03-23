import { resolve } from "path";

export default async function getVenue(id:string) {

    const respone = await fetch(`https://a08-venue-explorer-backend.vercel.app/api/v1/venues/${id}`)
    if(!respone.ok) {
        throw new Error("Failed to fetch venues")
    }

    return await respone.json()
}