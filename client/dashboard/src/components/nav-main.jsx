"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/data/routes";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

export function NavMain({ items }) {
  const pathname = usePathname();
  const { isUserLoading } = useAuth();
  return (
    <ScrollArea className={"h-[calc(100vh-96px)]"}>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          {isUserLoading
            ? Array.from({ length: sidebarData.length + 1 }).map((_, ind) => (
                <Skeleton className={"h-8 bg-gray-300"} key={ind} />
              ))
            : items.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.items?.some(
                    (item) => item.url === pathname
                  )}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn({
                        "bg-primary text-white":
                          pathname.includes(item.url) ||
                          item.items?.some((item) => item.url === pathname),
                      })}
                    >
                      <CollapsibleTrigger
                        asChild
                        className={cn("", {
                          "": pathname.includes(item.url),
                        })}
                      >
                        <Link href={item.url}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </CollapsibleTrigger>
                    </SidebarMenuButton>
                    {item.items?.length > 0 && (
                      <>
                        <CollapsibleTrigger
                          asChild
                          className={cn("", {
                            "bg-primary": pathname.includes(item.url),
                          })}
                        >
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  className={cn("", {
                                    "bg-primary text-white":
                                      pathname === subItem.url,
                                  })}
                                  asChild
                                >
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
        </SidebarMenu>
      </SidebarGroup>
    </ScrollArea>
  );
}
