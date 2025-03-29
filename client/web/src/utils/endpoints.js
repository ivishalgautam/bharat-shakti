export const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    refresh: "/auth/refresh",
    username: "/auth/username",
  },
  keywords: { getAll: "/keywords" },
  states: { getAll: "/states" },
  cities: { getAll: "/cities" },
  sectors: { getAll: "/sectors" },
  authorities: { getAll: "/authorities" },
  profile: "/users/me",
  files: {
    getFiles: "/upload",
    deleteKey: "/upload/s3",
    preSignedUrl: "/upload/presigned-url",
    preSignedUrls: "/upload/presigned-urls",
  },
};
