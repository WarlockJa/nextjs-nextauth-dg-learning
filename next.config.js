/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "scontent.*.fna.fbcdn.net",
        port: "",
        pathname: "/v/**",
      },
    ],
  },
};

module.exports = nextConfig;
