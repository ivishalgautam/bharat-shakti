import {
  BadgeIndianRupee,
  Landmark,
  LayoutDashboard,
  LayoutPanelTop,
  LayoutTemplate,
  LetterText,
  MapPin,
  MessageCircleQuestion,
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
        isVisible: false,
      },
      {
        title: "Edit User",
        url: "/users/edit/:id/user",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
      {
        title: "Edit Sub Admin",
        url: "/users/edit/:id/sub-admin",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
      {
        title: "Edit Sub Admin",
        url: "/users/view/:id/sub-admin",
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
    title: "Categories",
    url: "/categories",
    icon: LayoutPanelTop,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/categories/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/categories/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Sub Categories",
    url: "/subcategories",
    icon: LayoutTemplate,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/subcategories/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/subcategories/:id/edit",
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
    title: "Industries",
    url: "/industries",
    icon: LetterText,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/industries/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/industries/:id/edit",
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
    title: "Plans",
    url: "/plans",
    icon: BadgeIndianRupee,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/plans/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/plans/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "FAQs",
    url: "/faqs",
    icon: MessageCircleQuestion,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [
      {
        title: "Create",
        url: "/faqs/create",
        roles: [ROLES.ADMIN],
        isVisible: true,
      },
      {
        title: "Edit",
        url: "/faqs/:id/edit",
        roles: [ROLES.ADMIN],
        isVisible: false,
      },
    ],
  },
  {
    title: "Applications",
    url: "/applications",
    icon: ShieldQuestion,
    roles: [ROLES.ADMIN],
    isVisible: true,
    items: [],
  },
  // {
  //   title: "Profile Overview",
  //   url: "/profile",
  //   icon: User,
  //   roles: [ROLES.ADMIN, ROLES.STAFF],
  //   isVisible: false,
  //   items: [],
  // },
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
