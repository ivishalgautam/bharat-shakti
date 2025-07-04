"use client";
import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-client-provider";
import RoleContext from "@/providers/role-context";
import { usePathname } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next";
import Footer from "../footer";
import Header from "../header";
import { publicRoutes } from "@/data/routes";

export default function Layout({ children }) {
  const pathname = usePathname();

  const getContent = () => {
    // Array of all the paths that don't need the layout
    if (publicRoutes.includes(pathname)) {
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
