export default async function uploadProfilePic(token: string, base64Image: string) {
    const response = await fetch("https://be-se.vercel.app/api/v1/auth/uploadProfilePic", {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newProfilePic: base64Image
        })
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
        throw new Error(data.error || `Failed to upload profile picture - Status: ${response.status}`);
    }

    return data;
}