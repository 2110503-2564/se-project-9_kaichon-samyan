// components/DeleteConfirmationModal.tsx

"use client";

import deleteRating from "@/libs/deleteRating";
import { Rating } from "../../interface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteConfirmationModal({
  hotelId,
  rating,
  handleClose,
  setLoading
}: {
  hotelId: string;
  rating: Rating;
  handleClose: Function;
  setLoading: Function
}) {
  const session = useSession();
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    await deleteRating(hotelId, rating._id, session.data?.user.token);
    handleClose();
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-red-600">
        Confirm Deletion
      </h2>

      <div className="mb-4">
        <p className="mb-2">Are you sure you want to delete this rating?</p>
        <div className="flex text-yellow-400 text-xl mb-1">
          {Array.from({ length: rating.score }).map((_, i) => (
            <span key={i}>★</span>
          ))}
          {Array.from({ length: 5 - rating.score }).map((_, i) => (
            <span key={i}>☆</span>
          ))}
        </div>
        <p className="text-gray-700 italic">"{rating.comment}"</p>
      </div>

      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          onClick={() => handleClose()}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
