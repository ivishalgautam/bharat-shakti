import Image from "next/image";
import Link from "next/link";

export default function LogoWhite() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <figure className="flex aspect-video w-[150px] items-center md:w-[180px]">
        <Image
          src={"/logo-white.png"}
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
