"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { allRoutes } from "@/data/routes";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <NavigationList />
        </SheetContent>
      </Sheet>
      <div className="flex flex-1">
        <aside className="hidden w-[280px] flex-col border-r bg-white md:flex">
          <NavigationList />
        </aside>
        <main className="w-full overflow-hidden p-2">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
}

function NavigationList() {
  const pathname = usePathname();
  const { user } = useAuth();
  const tabs = useMemo(
    () =>
      allRoutes.filter(
        (route) =>
          !route.link.includes("/create") &&
          route.roles.includes(user?.role) &&
          route.tier.includes(user?.plan_tier),
      ),
    [user],
  );
  return (
    <nav className="grid gap-2 p-4 text-sm">
      {tabs.map((tab, key) => (
        <Link
          key={key}
          href={tab.link}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent",
            pathname === tab.link.split("?").shift()
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground",
          )}
        >
          <tab.icon className="h-5 w-5" />
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
