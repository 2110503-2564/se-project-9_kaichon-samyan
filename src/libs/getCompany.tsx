export default async function getCompany(id:string) {
  const response = await fetch(`http://localhost:5000/api/v1/companies/${id}`);

  if(!response.ok) {
    throw new Error(await response.json());
  }

  return await response.json();
}