export default async function userSignUp(name:string, email: string, password:string, tel:string) {
  const response = await fetch('https://frontend-backend-api-45mm.vercel.app/api/v1/auth/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password,
      tel
    })
  });

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message);
  }

  return data;
}