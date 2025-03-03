/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enables static export mode
  reactStrictMode: true,
  images: {
    unoptimized: true, // Ensures images work in static mode
  },
  
};

module.exports = nextConfig;
