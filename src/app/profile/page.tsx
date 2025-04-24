import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getMe from "@/libs/getMe";
import Profile from "@/components/Profile"; // this will be a client component
import uploadProfilePic from "@/libs/uploadProfile";
import { revalidatePath } from "next/cache";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  // if (!session || !session.user) {
  //   redirect("/api/auth/signin");
  // }
  const token = session?.user.token;
  if (!token) {
    return <div>Error: No token found in session</div>;
  }
  const uploadPic = async (formData: FormData) => {
    "use server";
    const file = formData.get("profilePic") as File;
    if (!file || file.size === 0) return;
    
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;
      await uploadProfilePic(token, base64Image);
      revalidatePath("/profile"); // Adjust this path as needed
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  };

  if (!session || !session.user || !session.user.token) {
    redirect("/api/auth/signin");
  }

  try {
    const userprofile = await getMe(token);
    return <Profile profile={userprofile.data} token={token} uploadPic={uploadPic} />;
  } catch (err) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="text-red-500 text-center">
            Error: Unable to fetch user profile. {String(err)}
          </div>
        </div>
      </div>
    );
  }
}
