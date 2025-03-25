export default async function bookSession(companyId: any, date:any, token: any) {
  const response = await fetch(`https://frontend-backend-api-45mm.vercel.app/api/v1/companies/${companyId}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      sessionDate: date
    })
  });

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message);
  }

  return data;
}