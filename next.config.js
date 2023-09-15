/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // github
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        // facebook
        protocol: "https",
        hostname: "scontent.*.fna.fbcdn.net",
        port: "",
        pathname: "/v/**",
      },
      {
        // google
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        // discord
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/avatars/**",
      },
      {
        // linkedin
        protocol: "https",
        hostname: "media.licdn.com",
        port: "",
        pathname: "/dms/image/**",
      },
      {
        // twitch
        protocol: "https",
        hostname: "static-cdn.jtvnw.net",
        port: "",
        pathname: "/jtv_user_pictures/**",
      },
      {
        // reddit
        protocol: "https",
        hostname: "styles.redditmedia.com",
        port: "",
        pathname: "/t5_9bqeci/styles/**",
      },
    ],
  },
};

module.exports = nextConfig;
