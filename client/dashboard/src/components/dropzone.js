"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

export default function Dropzone({ onDropFiles, multiple = false }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onDropFiles(acceptedFiles);
    },
    [onDropFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
    },
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 bg-gray-100"
      }`}
    >
      <input {...getInputProps()} />
      <UploadCloud className="w-10 h-10 text-gray-500" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? "Drop the files here..."
          : "Drag & drop files or click to browse"}
      </p>
      <p className="text-xs text-gray-400">
        Supported formats: JPG, PNG, GIF, PDF
      </p>
    </div>
  );
}
