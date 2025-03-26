export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    signup: "/auth/signup",
    refresh: "/auth/refresh",
    username: "/auth/username",
  },
  profile: "/users/me",
  authorities: { getAll: "/authorities" },
  tenders: { getAll: "/tenders" },
  sectors: { getAll: "/sectors" },
  keywords: { getAll: "/keywords" },
  states: { getAll: "/states" },
  cities: { getAll: "/cities" },
  files: {
    getFiles: "/upload",
    deleteKey: "/upload/s3",
    preSignedUrl: "/upload/presigned-url",
    preSignedUrls: "/upload/presigned-urls",
  },
};
