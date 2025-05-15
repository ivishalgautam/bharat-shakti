import { Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={"/logo.jpg"}
        width={150}
        height={150}
        alt="Bharat Shakti"
        className="rounded"
      />
    </Link>
  );
}
