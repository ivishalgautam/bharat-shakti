import {
  BookHeart,
  Eye,
  File,
  FileCheck2,
  FileUser,
  IndianRupee,
  Settings,
  User,
} from "lucide-react";

const ROLES = {
  ADMIN: "admin",
  USER: "user",
};
const TIER = {
  FREE: "free",
  STANDARD: "standard",
  PREMIUM: "premium",
  UNSUBSCRIBED: "unsubscribed",
};

export const allRoutes = [
  {
    link: "/",
    roles: [],
  },
  {
    label: "Profile",
    link: "/dashboard",
    roles: [ROLES.USER],
    tier: [TIER.FREE, TIER.UNSUBSCRIBED, TIER.STANDARD, TIER.PREMIUM],
    icon: User,
  },
  {
    label: "Viewed tenders",
    link: "/dashboard/viewed-tenders",
    roles: [ROLES.USER],
    tier: [TIER.PREMIUM],
    icon: Eye,
  },
  {
    label: "Favourite tenders",
    link: "/dashboard/favourite-tenders",
    roles: [ROLES.USER],
    tier: [TIER.STANDARD, TIER.PREMIUM],
    icon: BookHeart,
  },
  {
    label: "Tenders by preferences",
    link: "/tenders-by-preferences",
    roles: [ROLES.USER],
    tier: [TIER.STANDARD, TIER.PREMIUM],
    icon: Settings,
  },
  {
    label: "Plans",
    link: "/dashboard/plans",
    roles: [ROLES.USER],
    tier: [TIER.STANDARD, TIER.PREMIUM, TIER.FREE, TIER.UNSUBSCRIBED],
    icon: IndianRupee,
  },
  {
    label: "Applied tenders",
    link: "/dashboard/applied-tenders",
    roles: [ROLES.USER],
    tier: [TIER.STANDARD, TIER.PREMIUM],
    icon: FileUser,
  },
  {
    label: "Invoice Master",
    link: "/dashboard/invoice-master?page=1&limit=10",
    roles: [ROLES.USER],
    tier: [TIER.STANDARD, TIER.PREMIUM],
    icon: File,
  },
  {
    label: "Invoice Master",
    link: "/dashboard/invoice-master/create",
    roles: [ROLES.USER],
    tier: [TIER.STANDARD, TIER.PREMIUM],
    icon: File,
  },
  {
    label: "Order Follow Up",
    link: "/dashboard/order-follow-up?page=1&limit=10",
    roles: [ROLES.USER],
    tier: [TIER.STANDARD, TIER.PREMIUM],
    icon: FileCheck2,
  },
];

export const publicRoutes = [
  "/login",
  "/register",
  "/unauthorized",
  "/login-with-otp",
  "/forgot-password",
  "/reset-password",
];
