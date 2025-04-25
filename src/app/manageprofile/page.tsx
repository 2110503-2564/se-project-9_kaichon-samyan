// app/manage-profile/page.tsx (Server Component)
import getAllUsers from "@/libs/getAllUser";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import ManageProfileClient from "@/components/manageprofileclient";

export default async function ManageProfilePage() {
  const session = await getServerSession(authOptions);

  const token = session?.user?.token;

  if (!token) {
    return <div>Error: No token found in session</div>;
  }

  const usersResponse = await getAllUsers(token);

  return <ManageProfileClient users={usersResponse.data} />;
}
