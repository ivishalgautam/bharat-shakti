"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleLogout } from "@/providers/auth-provider";

import {
  FileSliders,
  LayoutDashboard,
  LogOutIcon,
  Crown,
  CreditCard,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

export default function UserDropdown({ user }) {
  const router = useRouter();
  const fallbackName = user.first_name.charAt(0) + user.last_name.charAt(0);

  const planName = user.plan_tier;
  const hasActiveSubscription = ["premium", "standard", "free"].includes(
    planName,
  );
  const getPlanIcon = (plan) => {
    switch (plan?.toLowerCase()) {
      case "premium":
        return <Crown size={14} className="text-yellow-500" />;
      case "standard":
        return <Zap size={14} className="text-blue-500" />;
      default:
        return <CreditCard size={14} className="text-gray-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback className="border border-primary bg-primary/20 uppercase">
            {fallbackName}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 dark:border-none" align="end">
        {/* Subscription Status */}
        <div className="px-2 py-1.5">
          {hasActiveSubscription ? (
            <div className="flex items-center gap-2 rounded-md bg-green-50 px-2 py-1.5 dark:bg-green-950/20">
              {getPlanIcon(planName)}
              <div className="flex w-full items-center justify-between">
                <span className="text-xs font-medium capitalize text-green-700 dark:text-green-400">
                  {planName} Plan
                </span>
                <Badge className="text-[10px]">Active</Badge>
              </div>
            </div>
          ) : (
            <Button
              size="sm"
              className="h-8 w-full text-xs"
              onClick={() => router.push("/pricing")}
            >
              <Crown size={14} className="mr-1.5" />
              Subscribe Now
            </Button>
          )}
        </div>

        <DropdownMenuSeparator className="dark:bg-white/8" />

        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium capitalize text-foreground">
            {user.first_name} {user.last_name}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="dark:bg-white/8" />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            <LayoutDashboard
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push("/tenders-by-preferences")}
          >
            <FileSliders size={16} className="opacity-60" aria-hidden="true" />
            <span>Tenders by Preferences</span>
          </DropdownMenuItem>

          {hasActiveSubscription && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/billing")}>
                <CreditCard
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Billing & Plans</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
