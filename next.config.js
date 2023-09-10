/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org', 'avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;
