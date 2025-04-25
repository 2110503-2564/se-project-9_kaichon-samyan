// app/manage-profile/ManageProfileClient.tsx (Client Component)
'use client';

import { useState } from "react";
import { UserProfile } from "../../interface";

interface Props {
  users: UserProfile[];
}

export default function ManageProfileClient({ users }: Props) {
  const [userList, setUserList] = useState<UserProfile[]>(users);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profiles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {userList.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4"
          >
            <img
              src={user.profileImg}
              alt={user.username}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <p className="text-lg font-semibold">{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
