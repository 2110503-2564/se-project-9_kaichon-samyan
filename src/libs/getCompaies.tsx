export default async function getCompanies() {
  const response = await fetch('https://frontend-backend-api-45mm.vercel.app/api/v1/companies');

  if(!response.ok) {
    throw new Error('Cannot fetch');
  }

  return await response.json();
}