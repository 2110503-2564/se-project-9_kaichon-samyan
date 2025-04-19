// components/DeleteConfirmationModal.tsx

"use client";

type DeleteConfirmationModalProps = {
  rating: {
    _id: string;
    stars: number;
    comment: string;
  };
  onConfirm: (id: string) => void;
  onCancel: () => void;
};

export default function DeleteConfirmationModal({
  rating,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Confirm Deletion
        </h2>

        <div className="mb-4">
          <p className="mb-2">Are you sure you want to delete this rating?</p>
          <div className="flex text-yellow-400 text-xl mb-1">
            {Array.from({ length: rating.stars }).map((_, i) => (
              <span key={i}>★</span>
            ))}
            {Array.from({ length: 5 - rating.stars }).map((_, i) => (
              <span key={i}>☆</span>
            ))}
          </div>
          <p className="text-gray-700 italic">"{rating.comment}"</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(rating._id)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
