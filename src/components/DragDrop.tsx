"use client";

import { useState, useRef } from "react";

export default function DragDropUpload({ onUpload }: { onUpload: (formData: FormData) => void }) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePic", file);
      setPreview(URL.createObjectURL(file));
      onUpload(formData);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePic", file);
      setPreview(URL.createObjectURL(file));
      onUpload(formData);
    }
  };

  return (
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
        <p className="text-gray-500">Drag & drop or click to upload a new profile picture</p>
      )}
    </div>
  );
}
