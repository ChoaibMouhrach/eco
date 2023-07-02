/** @type {import('next').NextConfig} */

const API_URL = "http://localhost:3001";

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: `${API_URL}/api`,
    API_STORAGE_URL: API_URL
  },
  images: {
    domains: ["cdn.shopify.com", "build4less.co.uk", "easygaming.ma", "localhost"],
  },
};

module.exports = nextConfig;
