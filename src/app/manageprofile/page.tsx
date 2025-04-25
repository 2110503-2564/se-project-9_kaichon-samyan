// app/manage-profile/page.tsx (Server Component)
import getAllUsers from "@/libs/getAllUser";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import ManageProfileClient from "@/components/ManageProfileClient";

export default async function ManageProfilePage() {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token; 
  if(session?.user.user.role !== "admin") {
    return (
      <div className="flex justify-center items-center mt-40">
        <h1 className="text-5xl">
          YOU ARE NOT ADMIN.
        </h1>
      </div>
    )
  }

  if (!token) {
    return <div>Error: No token found in session</div>;
  }

  const usersResponse = await getAllUsers(token);

  return <ManageProfileClient users={usersResponse.data} />;
}
