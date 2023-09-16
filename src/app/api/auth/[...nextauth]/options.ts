import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import FacebookProvider from "next-auth/providers/facebook";
import DiscordProvider from "next-auth/providers/discord";
import LinkedinProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import RedditProvider from "next-auth/providers/reddit";
import TwitchProvider from "next-auth/providers/twitch";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

export const options: NextAuthOptions = {
  // methods of authentication
  // TODO check session strategy
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "Name" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // no email or password provided
        // null tells NextAuth that credentials weren't correct
        if (!credentials?.email || !credentials.password) return null;

        // fetchign user data from the DB
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // no user with this email is found in the DB
        if (!user) return null;

        // checking if password is correct
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        // password is incorrect
        if (!isPasswordValid) return null;

        // returning user data
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID!,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID!,
      clientSecret: process.env.REDDIT_CLIENT_SECRET!,
      authorization: {
        params: {
          duration: "permanent",
        },
      },
      // reddit image url is not working
      profile(profile) {
        // console.log(profile);
        return {
          id: profile.id,
          name: profile.name,
          image: profile.icon_img,
        };
      },
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID!,
      clientSecret: process.env.TWITCH_CLIENT_SECRET!,
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: { scope: "openid profile email" },
      },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture ?? undefined,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // you can provide your own custom components here as describbed in (https://next-auth.js.org/configuration/options)
  // if not NextAuth will provide you with its own components
};
