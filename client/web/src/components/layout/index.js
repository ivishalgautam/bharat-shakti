"use client";
import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-client-provider";
import { usePathname } from "next/navigation";
import Header from "../header";
import Footer from "../footer";
import { NuqsAdapter } from "nuqs/adapters/next";
import RoleContext from "@/providers/role-context";

export default function Layout({ children }) {
  const pathname = usePathname();

  const getContent = () => {
    // Array of all the paths that don't need the layout
    if (["/login", "/register", "/unauthorized"].includes(pathname)) {
      return children;
    }

    return (
      <AuthProvider>
        <RoleContext>
          <Header />
          <div className="min-h-[calc(100vh-135px)]">{children}</div>
          <Footer />
        </RoleContext>
      </AuthProvider>
    );
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <QueryProvider>
        <NuqsAdapter>{getContent()}</NuqsAdapter>
      </QueryProvider>
    </div>
  );
}
