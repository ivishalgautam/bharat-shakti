import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex aspect-video w-44 items-center justify-center"
    >
      <figure>
        <Image
          src={"/logo.png"}
          width={1000}
          height={1000}
          alt="Bharat Shakti"
          className="rounded object-contain object-center"
          quality={100}
          priority
        />
      </figure>
    </Link>
  );
}
