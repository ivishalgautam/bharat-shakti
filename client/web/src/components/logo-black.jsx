import Image from "next/image";
import Link from "next/link";

export default function LogoBlack() {
  return (
    <Link href="/">
      <figure className="">
        <Image
          src={"/logo-black.png"}
          width={200}
          height={200}
          alt="Bharat Shakti"
          className="rounded object-contain object-center"
          quality={100}
        />
      </figure>
    </Link>
  );
}
