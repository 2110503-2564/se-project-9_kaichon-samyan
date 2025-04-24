"use client";

import { useState, useRef } from "react";

export default function DragDropUpload({
  onUpload,
  setIsPopupOpen,
}: {
  onUpload: (formData: FormData) => void;
  setIsPopupOpen: (open: boolean) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Please upload a file smaller than 5MB.");
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Please upload a file smaller than 5MB.");
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    if (isUploading) return; // Prevent cancel during upload
    setPreview(null);
    setSelectedFile(null);
    fileInputRef.current && (fileInputRef.current.value = "");
    setIsPopupOpen(false);
  };

  const handleConfirm = async () => {
    if (!selectedFile || isUploading) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      await onUpload(formData);
      handleCancel(); // Close and reset after upload
    } catch (error) {
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed p-4 text-center cursor-pointer rounded-lg transition ${
          dragging ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"
        } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          name="profilePic"
          className="hidden"
          onChange={handleFileChange}
        />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="mx-auto h-24 w-24 object-cover rounded-full"
          />
        ) : (
          <p className="text-gray-500">
            Drag & drop or click to select a profile picture
          </p>
        )}
      </div>

      {isUploading && <p className="text-sm text-blue-500 text-center">Uploading...</p>}

      {preview && (
        <div className="flex justify-between space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isUploading}
            className="w-full text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isUploading}
            className="w-full bg-blue-500 text-white text-sm py-1 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Confirm Upload"}
          </button>
        </div>
      )}
    </div>
  );
}
