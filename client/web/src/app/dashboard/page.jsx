"use client";

import { Suspense, useState } from "react";
import {
  Bell,
  Eye,
  Heart,
  Home,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { UserProfile } from "@/components/user-profile";
import CompanyProfilePage from "./_components/company-profile-page";
import { ScrollArea } from "@/components/ui/scroll-area";
import TendersFiltersLayout from "@/components/layout/tenders-filters-layout";
import TendersListing from "./_components/tenders-listing";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("profile");

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
          <NavigationList setActiveTab={setActiveTab} activeTab={activeTab} />
        </SheetContent>
      </Sheet>
      <div className="flex flex-1">
        <aside className="hidden w-[280px] flex-col border-r bg-white md:flex">
          <NavigationList setActiveTab={setActiveTab} activeTab={activeTab} />
        </aside>
        <main className="flex-1 p-2">
          <ScrollArea className="h-screen">
            <div className="grid gap-4 md:gap-8">
              {activeTab === "profile" && <CompanyProfilePage />}
              {activeTab === "favorites" && (
                <TendersFiltersLayout>
                  <Suspense fallback={"Loading..."}>
                    <TendersListing type={"favourite"} />
                  </Suspense>
                </TendersFiltersLayout>
              )}
              {activeTab === "viewed" && (
                <TendersFiltersLayout>
                  <Suspense fallback={"Loading..."}>
                    <TendersListing type={"viewed"} />
                  </Suspense>
                </TendersFiltersLayout>
              )}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}

function NavigationList({ activeTab, setActiveTab }) {
  return (
    <nav className="grid gap-2 p-4 text-sm">
      <Link
        href="#"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent",
          activeTab === "profile"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground",
        )}
        onClick={() => setActiveTab("profile")}
      >
        <User className="h-5 w-5" />
        Profile
      </Link>
      <Link
        href="#"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent",
          activeTab === "favorites"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground",
        )}
        onClick={() => setActiveTab("favorites")}
      >
        <Heart className="h-5 w-5" />
        Favorites tenders
      </Link>
      <Link
        href="#"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent",
          activeTab === "viewed"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground",
        )}
        onClick={() => setActiveTab("viewed")}
      >
        <Eye className="h-5 w-5" />
        Viewed tenders
      </Link>
    </nav>
  );
}
