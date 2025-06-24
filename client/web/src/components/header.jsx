"use client";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./logo";
import { Button, buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Skeleton } from "./ui/skeleton";
import UserDropdown from "./user-dropdown";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

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
    <header className="sticky top-0 z-50 w-full border-b bg-white py-2">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden gap-6 lg:flex">
          <NavigationTabs />
        </nav>
        <div className="flex items-center gap-2">
          {user && <UserDropdown user={user} />}
          {!user && (
            <div className="hidden space-x-2 lg:block">
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
            </div>
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
                        className="flex items-center justify-center gap-2"
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
                        className="inline-block rounded-lg px-4 py-2 text-lg hover:bg-primary hover:text-white"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {menu.label}
                      </Link>
                    ))}
                  </div>
                  {!user && (
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href="/login"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            effect: "shineHover",
                            size: "sm",
                          }),
                          "w-full",
                        )}
                      >
                        Log In
                      </Link>
                      <Link
                        href="/register"
                        className={cn(
                          buttonVariants({
                            effect: "shineHover",
                            size: "sm",
                          }),
                          "w-full",
                        )}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const NavigationTabs = () => {
  const [selected, setSelected] = useState(navItems[0]);
  const pathname = usePathname();
  return (
    <div className="flex flex-wrap items-center gap-2">
      {navItems.map((tab, index) => (
        <Tab
          tab={tab}
          selected={pathname === (tab.href === "Home" ? "/" : tab.href)}
          setSelected={setSelected}
          key={tab.label}
        />
      ))}
    </div>
  );
};

const Tab = ({ tab, selected, setSelected }) => {
  return (
    <button
      onClick={() => setSelected(tab)}
      className={`${
        selected
          ? "text-white"
          : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
      } relative rounded-md px-2 py-1 text-sm font-medium transition-colors`}
    >
      <Link href={tab.href}>
        <span className="relative z-10">{tab.label}</span>
      </Link>
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className="absolute inset-0 z-0 rounded-md bg-primary"
        ></motion.span>
      )}
    </button>
  );
};
