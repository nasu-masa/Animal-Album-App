import type { NextConfig } from "next";

const apiUrl = process.env.API_URL ?? "http://localhost:8000";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/sanctum/csrf-cookie",
        destination: `${apiUrl}/sanctum/csrf-cookie`,
      },
      {
        source: "/login",
        destination: `${apiUrl}/login`,
      },
      {
        source: "/logout",
        destination: `${apiUrl}/logout`,
      },
      {
        source: "/register",
        destination: `${apiUrl}/register`,
      },
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "animal-album-backend.onrender.com",
        pathname: "/storage/**",
      },
    ],
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
