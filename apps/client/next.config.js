/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://192.168.11.105:3001/api",
  },
  transpilePackages: ["ui"],
};

module.exports = nextConfig;
