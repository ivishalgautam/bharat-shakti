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
        hostname: "bsapi.bwdemo.in",
        port: "",
      },
    ],
  },
};

export default nextConfig;
