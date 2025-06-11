import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LogoBlack() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <figure className="flex aspect-video w-[150px] items-center md:w-[180px]">
        <Image
          src={"/logo-black.png"}
          width={500}
          height={500}
          alt="Bharat Shakti"
          className="rounded object-contain object-center"
          quality={100}
        />
      </figure>
    </Link>
  );
}
