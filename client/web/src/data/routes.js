const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export const allRoutes = [
  {
    link: "/",
    roles: [],
  },
  {
    link: "/dashboard",
    roles: [ROLES.USER],
  },
  {
    link: "/dashboard/viewed-tenders",
    roles: [ROLES.USER],
  },
  {
    link: "/dashboard/favourite-tenders",
    roles: [ROLES.USER],
  },
  {
    link: "/dashboard/applied-tenders",
    roles: [ROLES.USER],
  },
];
