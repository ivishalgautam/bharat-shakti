import {
  BookHeart,
  Eye,
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
    label: "Applied tenders",
    link: "/dashboard/applied-tenders",
    roles: [ROLES.USER],
    tier: [TIER.STANDARD, TIER.PREMIUM],
    icon: FileUser,
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
];
