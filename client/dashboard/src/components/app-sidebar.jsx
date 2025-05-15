"use client";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/data/routes";
import { NavUser } from "./nav-user";
import { useAuth } from "@/providers/auth-provider";
import { Skeleton } from "./ui/skeleton";
import { useMemo } from "react";

export function AppSidebar({ ...props }) {
  const { user, isUserLoading } = useAuth();
  const filteredRoutes = useMemo(() => {
    return sidebarData
      .filter((route) => route.roles.includes(user?.role))
      .map((item) => {
        return {
          ...item,
          items: item.items.filter(
            (item) => item.roles.includes(user?.role) && item.isVisible
          ),
        };
      });
  }, [user]);

  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarContent>
        <NavMain items={filteredRoutes} />
      </SidebarContent>
      <SidebarFooter>
        {isUserLoading ? (
          <Skeleton className={"bg-white/5 h-12"} />
        ) : (
          <NavUser user={user} />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
