"use client";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { Menu, ChevronDown } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
import UserDropdown from "./user-dropdown";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export const navItems = [
  {
    label: "Live Tenders",
    href: "/tenders",
  },
  {
    label: "Go Premium",
    href: "/pricing",
  },
  {
    label: "About",
    subItems: [
      { label: "Who we are", href: "/about" },
      { label: "Get in touch", href: "/contact" },
    ],
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
        <nav className="hidden gap-6 md:flex">
          <NavigationTabs />
        </nav>
        <div className="flex items-center gap-2">
          {user && <UserDropdown user={user} />}
          {!user && (
            <div className="hidden space-x-2 md:block">
              <Link
                href="/login"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    effect: "shineHover",
                    size: "sm",
                  }),
                  "hover:bg-secondary",
                )}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({
                    effect: "gooeyRight",
                    size: "sm",
                    variant: "outline",
                  }),
                  "border-2 border-secondary bg-transparent text-secondary hover:bg-secondary",
                )}
              >
                Join for Free
              </Link>
            </div>
          )}
          <div className="block md:hidden">
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
                      <div key={idx}>
                        {menu.subItems ? (
                          <div className="flex flex-col">
                            <div className="inline-block rounded-lg px-4 py-2 text-lg font-medium text-gray-700">
                              {menu.label}
                            </div>
                            {menu.subItems.map((subItem, subIdx) => (
                              <Link
                                key={subIdx}
                                href={subItem.href}
                                className="ml-4 inline-block rounded-lg px-4 py-2 text-base hover:bg-primary hover:text-white"
                                onClick={() => setIsSheetOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <Link
                            href={menu.href}
                            className="inline-block w-full rounded-lg px-4 py-2 text-lg hover:bg-primary hover:text-white"
                            onClick={() => setIsSheetOpen(false)}
                          >
                            {menu.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                  {!user && (
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href="/login"
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                            effect: "shineHover",
                            size: "sm",
                          }),
                          "w-full",
                        )}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className={cn(
                          buttonVariants({
                            effect: "gooeyRight",
                            size: "sm",
                            variant: "outline",
                          }),
                          "w-full border-2 border-secondary bg-transparent text-secondary hover:bg-secondary",
                        )}
                      >
                        Join for Free
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
  const pathname = usePathname();

  const isSelected = (item) => {
    if (item.href && pathname === item.href) return true;
    if (item.subItems) {
      return item.subItems.some((subItem) => pathname === subItem.href);
    }
    return false;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {navItems.map((tab, index) => (
        <Tab tab={tab} selected={isSelected(tab)} key={tab.label} />
      ))}
    </div>
  );
};

const Tab = ({ tab, selected }) => {
  if (tab.subItems) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`${
              selected
                ? "text-white"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
            } relative flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium transition-colors`}
          >
            <span className="relative z-10">{tab.label}</span>
            <ChevronDown
              className={cn("z-10 h-3 w-3", {
                "text-white": selected,
              })}
            />
            {selected && (
              <motion.span
                layoutId="tab"
                transition={{ type: "spring", duration: 0.4 }}
                className="absolute inset-0 z-0 rounded-md bg-primary"
              ></motion.span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {tab.subItems.map((subItem, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={subItem.href} className="w-full cursor-pointer">
                {subItem.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link href={tab.href}>
      <button
        className={`${
          selected
            ? "text-white"
            : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
        } relative rounded-md px-2 py-1 text-sm font-medium transition-colors`}
      >
        <span className="relative z-10">{tab.label}</span>
        {selected && (
          <motion.span
            layoutId="tab"
            transition={{ type: "spring", duration: 0.4 }}
            className="absolute inset-0 z-0 rounded-md bg-primary"
          ></motion.span>
        )}
      </button>
    </Link>
  );
};
