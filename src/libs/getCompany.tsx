export default async function getCompany(id:string) {
  const response = await fetch(`http://frontend-backend-api-45mm.vercel.app/api/v1/companies/${id}`);

  if(!response.ok) {
    throw new Error(await response.json());
  }

  return await response.json();
}