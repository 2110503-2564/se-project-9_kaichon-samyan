"use client";

import { useState, useRef } from "react";

export default function DragDropUpload({ onUpload }: { onUpload: (formData: FormData) => void }) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleConfirm = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("profilePic", selectedFile);
      onUpload(formData);
      handleCancel(); // Reset after upload
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
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed p-4 text-center cursor-pointer rounded-lg transition ${
          dragging ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"
        }`}
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
          <img src={preview} alt="Preview" className="mx-auto h-24 w-24 object-cover rounded-full" />
        ) : (
          <p className="text-gray-500">Drag & drop or click to select a profile picture</p>
        )}
      </div>

      {preview && (
        <div className="flex justify-between space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full text-sm text-red-500 hover:text-red-700 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full bg-blue-500 text-white text-sm py-1 rounded hover:bg-blue-600 transition"
          >
            Confirm Upload
          </button>
        </div>
      )}
    </div>
  );
}
