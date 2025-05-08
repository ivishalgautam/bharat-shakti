import { BookHeart, Eye, FileUser, Settings, User } from "lucide-react";

const ROLES = {
  ADMIN: "admin",
  USER: "user",
};
const TIER = {
  FREE: "free",
  STANDARD: "standard",
  PREMIUM: "premium",
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
    tier: [TIER.FREE, TIER.STANDARD, TIER.PREMIUM],
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
    label: "Preferences",
    link: "/dashboard/preferences",
    roles: [ROLES.USER],
    tier: [TIER.FREE, TIER.STANDARD, TIER.PREMIUM],
    icon: Settings,
  },
];
