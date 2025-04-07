"use client";
import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-client-provider";
import { usePathname, useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { Toaster } from "../ui/toaster";
import RoleContext from "@/providers/role-context";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

export default function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const getContent = () => {
    // Array of all the paths that don't need the layout
    if (["/", "/signup", "/unauthorized"].includes(pathname)) {
      return children;
    }

    return (
      <AuthProvider>
        <RoleContext>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full bg-gray-100">
              <SidebarTrigger />
              <div className="min-h-[calc(100vh-135px)] p-4 pt-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="h-8 mb-2"
                >
                  <ChevronLeft />
                  Back
                </Button>
                {children}
              </div>
              <Toaster />
            </main>
          </SidebarProvider>
        </RoleContext>
      </AuthProvider>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <QueryProvider>{getContent()}</QueryProvider>
    </div>
  );
}
