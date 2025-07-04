"use client";
import config from "@/config";
import Image from "next/image";
import { useState } from "react";

export default function ImageWithFallback({
  width,
  height,
  alt,
  src,
  className,
}) {
  const [isImageError, setIsImageError] = useState(false);
  return (
    <Image
      src={
        isImageError ? "/images/not-found.png" : `${config.file_base}/${src}`
      }
      width={width ?? 100}
      height={height ?? 100}
      alt={alt ?? "not found"}
      className={className}
      onError={() => setIsImageError(true)}
    />
  );
}
