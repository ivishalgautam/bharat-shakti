import {
  Landmark,
  LayoutDashboard,
  LetterText,
  MapPin,
  MessageSquareText,
  ScrollText,
  Settings,
  ShieldQuestion,
  User,
  Users,
} from "lucide-react";

const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export const sidebarData = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [],
  },
  {
    title: "User",
    url: "/users",
    icon: Users,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/users/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/users/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Tenders",
    url: "/tenders",
    icon: ScrollText,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/tenders/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/tenders/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Authorities",
    url: "/authorities",
    icon: Landmark,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/authorities/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/authorities/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "States",
    url: "/states",
    icon: MapPin,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/states/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/states/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Cities",
    url: "/cities",
    icon: MapPin,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/cities/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/cities/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Keywords",
    url: "/keywords",
    icon: LetterText,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/keywords/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/keywords/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Sectors",
    url: "/sectors",
    icon: Settings,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/sectors/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/sectors/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Enquiries",
    url: "#",
    icon: ShieldQuestion,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [],
  },
  {
    title: "Queries",
    url: "#",
    icon: MessageSquareText,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [],
  },
  {
    title: "Profile Overview",
    url: "/profile",
    icon: User,
    roles: [ROLES.ADMIN, ROLES.STAFF, ROLES.ADMIN],
    isVisible: true,
    items: [],
  },
];

export const filteredRoutes = sidebarData.flatMap((item) =>
  item.items.length ? [item.url, ...item.items.map(({ url }) => url)] : item.url
);
export const filteredRoutesWithRoles = sidebarData.flatMap((item) =>
  item.items.length
    ? [
        { url: item.url, roles: item.roles },
        ...item.items.map(({ url, roles }) => ({ url, roles })),
      ]
    : { url: item.url, roles: item.roles }
);

export const publicRoutes = ["/", "/admin", "/register"];
