/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://localhost:3001/api",
  },
  images: {
    domains: ["cdn.shopify.com", "build4less.co.uk", "easygaming.ma"],
  },
};

module.exports = nextConfig;
