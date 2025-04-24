import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getMe from "@/libs/getMe";
import { redirect } from "next/navigation";
import uploadProfilePic from "@/libs/uploadProfile";
import { revalidatePath } from "next/cache";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  const token = session.user.token;
  if (!token) {
    return <div>Error: No token found in session</div>;
  }

  const uploadPic = async (formData: FormData) => {
    "use server";
    const file = formData.get("profilePic") as File;
    if (file && file.size > 0) {
      await uploadProfilePic(token);
    }
    revalidatePath("/profile"); // Adjust this path as needed
  };

  try {
    const userprofile = await getMe(token);
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">User Profile</h1>

          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              {userprofile.data.profileImg ? (
                <img
                  src={userprofile.data.profileImg}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-500">
                  <span className="text-2xl font-bold text-blue-500">
                    {userprofile.data.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Upload Form */}
            <form action={uploadPic}>
              <input type="file" name="profilePic" accept="image/*" className="mb-2" />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Upload New Picture
              </button>
            </form>

            {/* User Details */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex py-2">
                <span className="font-semibold w-24 text-gray-600">Name:</span>
                <span className="text-gray-800">{userprofile.data.name}</span>
              </div>
              <div className="flex py-2 border-t border-gray-100">
                <span className="font-semibold w-24 text-gray-600">Email:</span>
                <span className="text-gray-800">{userprofile.data.email}</span>
              </div>
              <div className="flex py-2 border-t border-gray-100">
                <span className="font-semibold w-24 text-gray-600">Phone:</span>
                <span className="text-gray-800">{userprofile.data.tel}</span>
              </div>
              <div className="flex py-2 border-t border-gray-100">
                <span className="font-semibold w-24 text-gray-600">Role:</span>
                <span className="text-gray-800 capitalize">{userprofile.data.role}</span>
              </div>
              <div className="flex py-2 border-t border-gray-100">
                <span className="font-semibold w-24 text-gray-600">Member since:</span>
                <span className="text-gray-800">
                  {new Date(userprofile.data.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="text-red-500 text-center">
            Error: Unable to fetch user profile. {String(error)}
          </div>
        </div>
      </div>
    );
  }
}
