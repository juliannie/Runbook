/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow avatars from Google (and a couple of common providers if you use them later)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub (optional)
      },
      {
        protocol: "https",
        hostname: "gravatar.com", // Gravatar (optional)
      },
    ],
  },
};

export default nextConfig;
