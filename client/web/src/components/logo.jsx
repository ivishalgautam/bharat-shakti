import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex aspect-video w-36 items-center justify-center"
    >
      <figure>
        <Image
          src={"/logo.png"}
          width={200}
          height={200}
          alt="Bharat Shakti"
          className="rounded object-contain object-center"
          quality={80}
          priority
        />
      </figure>
    </Link>
  );
}
