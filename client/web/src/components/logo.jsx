import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative w-[130px] md:w-[180px]">
        <Image
          src="/logo.png"
          width={180}
          height={101}
          alt="Bharat Shakti"
          className="rounded object-contain"
          priority
          sizes="(max-width: 768px) 130px, 180px"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "100%",
          }}
        />
      </div>
    </Link>
  );
}
