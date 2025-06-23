/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "6001",
      },
      {
        protocol: "https",
        hostname: "api.bharatshaktitenders.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
