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
    roles: [ROLES.USER, ROLES.ADMIN],
  },
];
