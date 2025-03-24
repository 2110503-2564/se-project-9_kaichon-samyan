export default async function getCompanies() {
  const response = await fetch('http://localhost:5000/api/v1/companies');

  if(!response.ok) {
    throw new Error('Cannot fetch');
  }

  return await response.json();
}