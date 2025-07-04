"use client";
import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-client-provider";
import RoleContext from "@/providers/role-context";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { AppSidebar } from "../app-sidebar";
import { Button } from "../ui/button";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

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
            <main className="bg-gray-100 w-full">
              <SidebarTrigger />
              <div className="min-h-[calc(100vh-135px)] px-4 py-1 pb-4">
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
