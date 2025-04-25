export default async function userSignUp(name:string, email: string, password:string, tel:string) {
  const response = await fetch('https://be-se.vercel.app/api/v1/auth/register', {
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
  console.log("1")
  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message);
  }
  console.log(data);
  return data;
}