"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import Logo from "./logo";
import UserDropdown from "./user-dropdown";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Skeleton } from "./ui/skeleton";

export default function Header() {
  const [user, setUser, isHydrated] = useLocalStorage("user", null);

  if (!isHydrated) {
    return <Skeleton className={"h-20 rounded-none bg-gray-200"} />;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <nav className="hidden gap-6 md:flex">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link
            href="/tenders"
            className="text-sm font-medium hover:text-primary"
          >
            Tenders
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Services
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            About Us
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <UserDropdown user={user} />
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "outline",
                  effect: "shineHover",
                  size: "sm",
                })}
              >
                Log In
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ effect: "shineHover", size: "sm" })}
              >
                Register
              </Link>
            </>
          )}
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
