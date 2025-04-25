export default async function deleteUserPic(token: string,id : string) {
    const response = await fetch("https://be-se.vercel.app/api/v1/auth/deleteUserPic", {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: id
        }),
        cache: "no-store"
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
        throw new Error(data.error || `Failed to delete profile picture - Status: ${response.status}`);
    }

    return data;
}