"use client";
import config from "@/config";
import Image from "next/image";
import { useState } from "react";

const baseUrl = config.file_base;
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
      src={isImageError ? "/image-not-found.png" : `${baseUrl}/${src}`}
      width={width}
      height={height}
      alt={alt}
      className={className}
      onError={() => setIsImageError(true)}
    />
  );
}
