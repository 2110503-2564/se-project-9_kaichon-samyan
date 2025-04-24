"use client";

import React from "react";
import { useState } from "react";
import DragDropUpload from "./DragDrop";
import changeUserName from "@/libs/changeUserName";
import { useSession } from "next-auth/react";
import changePassword from "@/libs/changePassword";
import { useRouter } from "next/navigation";

export default function Profile({ profile, token, uploadPic }: { profile: any; token: string; uploadPic: (formData: FormData) => void }) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const session = useSession();
  const router = useRouter();

  const onConfirm = async ()=>{
    if(username!==""){
      await changeUserName(username,session.data?.user.token);
    }
   if(newPassword!==""){
    await changePassword(oldPassword,newPassword,session.data?.user.token);
   }
    setUsername("");
    setNewPassword("");
    setOldPassword("");
    router.refresh();
  }

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">User Profile</h1>

        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            {/* Profile Picture */}
            {profile.profileImg ? (
              <img
                src={profile.profileImg}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-500">
                <span className="text-2xl font-bold text-blue-500">
                  {profile.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            {[
              ["Username", profile.username],
              ["Name", profile.name],
              ["Email", profile.email],
              ["Phone", profile.tel],
              ["Role", profile.role],
              ["Member since", new Date(profile.createdAt).toLocaleDateString()],
            ].map(([label, value]) => (
              <div className="flex py-2 border-t border-gray-100" key={label}>
                <span className="font-semibold w-24 text-gray-600">{label}:</span>
                <span className="text-gray-800 capitalize">{value}</span>
              </div>
            ))}
            {/*edit profile button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsPopupOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*Popup for edit*/}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[25%] text-center items-center">
            <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Edit Profile</h1>

            <div className="flex flex-row p-2 items-center justify-center">
              <div className="flex justify-center items-center w-1/2">
                {profile.profileImg ? (
                  <div className="w-32 h-32 m-2 rounded-full overflow-hidden border-2 border-blue-500">
                    <img
                      src={profile.profileImg}
                      alt="Profile"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                ) : (
                  <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-500">
                    <span className="text-2xl font-bold text-blue-500">
                      {profile.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center w-1/2">
                <DragDropUpload onUpload={uploadPic} setIsPopupOpen={setIsPopupOpen} />
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center gap-4 p-4">
              <div>
                <h4 className="flex flex-row mb-5">Change Username : </h4>
                <input
                  type="text"
                  placeholder="New Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full sm:w-[250px] px-4 py-2 bg-sky-50 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-300"
                />
              </div>
              
              <div>
                <h4 className="flex flex-row mb-5">Change Password : </h4>
                <div className="flex flex-col gap-4">
                  <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full sm:w-[250px] px-4 py-2 bg-sky-50 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-300"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full sm:w-[250px] px-4 py-2 bg-sky-50 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-300"
                  />
                </div>
                
              </div>
              
            </div>
            
            <div className="flex flex-row justify-center gap-4">
            <button
              onClick={() => {onConfirm();setIsPopupOpen(false);}}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Confirm
            </button>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition duration-300"
            >
              Close
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
