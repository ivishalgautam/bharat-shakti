import { Building2, LogIn, Menu } from "lucide-react";
import Link from "next/link";
import React, { useContext } from "react";
import { Button, buttonVariants } from "./ui/button";
import Logo from "./logo";
import { useAuth } from "@/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import config from "@/config";
import AvatarDropdown from "./ui/avatar-dropdown";
import { Skeleton } from "./ui/skeleton";
import UserDropdown from "./user-dropdown";

export default function Header() {
  const { user, isUserLoading } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <nav className="hidden gap-6 md:flex">
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Tenders
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Services
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Resources
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            About Us
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {isUserLoading ? null : user ? (
            <UserDropdown />
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
                href="#"
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
