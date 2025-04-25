'use client';

import { useState } from "react";
import { UserProfile } from "../../interface";
import deleteUserPic from "@/libs/deleteUserPic";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

interface Props {
  users: UserProfile[];
}

export default function ManageProfileClient({ users }: Props) {
  const [userList, setUserList] = useState<UserProfile[]>(users);
  const { data: session } = useSession();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    setLoadingId(id);
    try {
      if (session?.user.token) {
        await deleteUserPic(session.user.token, id);
      }
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setLoadingId(null);
      router.refresh();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profiles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 relative"
          >
            {user.profileImg ? (
              <img
                src={user.profileImg}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
              />
            ) : (
              <span className="w-16 h-16 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}

            <div className="flex-1">
              <p className="text-lg font-semibold">{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="flex flex-row gap-4">
              <button
                onClick={() => handleDelete(user._id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition duration-300 disabled:opacity-50"
                disabled={loadingId === user._id}
              >
                {loadingId === user._id ? "Deleting..." : "Delete Picture"}
              </button>
            </div>

            {/* Spinner */}
            {loadingId === user._id && (
              <div className="absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center rounded-lg z-10">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
