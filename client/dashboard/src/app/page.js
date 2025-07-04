import LoginForm from "@/components/forms/login";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-12">
      {/* Left side - Image */}
      <div className="relative hidden lg:col-span-8 md:flex md:col-span-7 md:items-center md:justify-center">
        <Image
          src="/images/login.svg"
          alt="Login background"
          width={500}
          height={500}
          className="object-cover"
          priority
        />
      </div>

      {/* Right side - Login Form */}
      <div className="flex items-center justify-center bg-white p-8 md:col-span-5 lg:col-span-4">
        <LoginForm />
      </div>
    </div>
  );
}
