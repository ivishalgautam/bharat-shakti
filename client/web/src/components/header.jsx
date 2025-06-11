"use client";
import { Menu, Rocket } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import Logo from "./logo";
import UserDropdown from "./user-dropdown";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Skeleton } from "./ui/skeleton";
import { useAuth } from "@/providers/auth-provider";
import { Suspense, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Tenders",
    href: "/tenders",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [user, setUser, isHydrated] = useLocalStorage("user", null);
  const { user: user1 } = useAuth();
  useEffect(() => {
    if (!user && user1) {
      setUser(user1);
    }
  }, [user1, setUser, user]);

  if (!isHydrated) {
    return <Skeleton className={"h-20 rounded-none bg-gray-200"} />;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Suspense>
            <Logo />
          </Suspense>
        </div>
        <nav className="hidden gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
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
          <div className="block lg:hidden">
            <div className="flex items-center justify-between">
              <Sheet onOpenChange={setIsSheetOpen} open={isSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant={"outline"} size={"icon"}>
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <div
                        className="flex items-center gap-2"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        <Logo />
                      </div>
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                      Nav items
                    </SheetDescription>
                  </SheetHeader>
                  <div className="my-4 flex flex-col gap-0">
                    {navItems.map((menu, idx) => (
                      <Link
                        key={idx}
                        href={menu.href}
                        className="py-2 text-lg font-semibold"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {menu.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
