export default async function deleteProfilePic(token: string) {
    const response = await fetch("https://be-se.vercel.app/api/v1/auth/deleteProfilePic", {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        cache: "no-store"
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
        throw new Error(data.error || `Failed to upload profile picture - Status: ${response.status}`);
    }

    return data;
}