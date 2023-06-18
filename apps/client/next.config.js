/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://localhost:3001/api",
  },
  transpilePackages: ["ui"],
};

module.exports = nextConfig;
