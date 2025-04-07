"use client";
import { filteredRoutesWithRoles } from "@/data/routes";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "./auth-provider";

export default function RoleContext({ children }) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const { user, isUserLoading } = useContext(AuthContext);
  useEffect(() => {
    if (isUserLoading) return;
    let currRoute = pathname.replace(params.id, ":id");
    const protectedRoute = filteredRoutesWithRoles.find(
      (fr) => fr.url === currRoute
    );

    if (!protectedRoute) return;
    const roles = protectedRoute.roles;

    if (!roles.includes(user.role)) return router.replace("/unauthorized");
  }, [user, params.id, pathname, router, isUserLoading]);

  return children;
}
