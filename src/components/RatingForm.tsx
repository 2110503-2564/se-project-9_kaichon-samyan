"use client";

import addRating from "@/libs/addRating";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function RatingForm({ companyId, handleClose }: { companyId: string, handleClose: Function }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const router = useRouter();

  const session = useSession();

  useEffect(() => {
    if (!session.data?.user) {
      router.push("/api/auth/signin");
    }
  }, [session.data?.user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addRating(companyId, rating, comment, session.data?.user.token);
    setRating(0);
    setComment("");
    router.refresh();
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Leave a Rating</h2>

        <div className="flex mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl transition ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
          rows={3}
          required
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
            onClick={() => handleClose()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
