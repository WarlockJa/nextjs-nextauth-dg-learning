import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import FacebookProvider from "next-auth/providers/facebook";
import DiscordProvider from "next-auth/providers/discord";
import LinkedinProvider from "next-auth/providers/linkedin";
import { LinkedInProfile } from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import RedditProvider from "next-auth/providers/reddit";
import TwitchProvider from "next-auth/providers/twitch";
import GitHubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
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
          role: user.role,
          // custom key to demonstrate its use in the NextAuth session
          customKey: "Some custom key",
        };
      },
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID!,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    // }),
    GoogleProvider({
      // importing profile from Google
      profile(profile: GoogleProfile) {
        // console.log(profile);
        return {
          ...profile,
          role: ["user"],
          id: profile.sub,
          image: profile.picture,
        };
      },
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
      // profile(profile) {
      //   return {
      //     id: profile.id,
      //     name: profile.name,
      //     image: profile.icon_img,
      //   };
      // },
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
      // provided by next-auth LinkedInProfile may be outdated
      profile(profile: LinkedInProfile, tokens) {
        // console.log(profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture ?? undefined,
          role: ["user"],
        };
      },
    }),
    GitHubProvider({
      // importing profile from GitHub
      profile(profile: GithubProfile) {
        // console.log(profile);
        return {
          ...profile,
          role: ["user"],
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // you can provide your own custom components here as describbed in (https://next-auth.js.org/configuration/options)
  // if not NextAuth will provide you with its own components
  callbacks: {
    jwt: ({ user, token }) => {
      // the user parameters only shows up once when authenticating
      if (user) {
        // console.log("JWT Callback", { token, user });

        // the default return type does not contain custom properties, so we need to define a custom type
        // we're using extended Prisma User type with custom properties added
        // const typedUser = user as unknown as User;
        return {
          ...token,
          // id: typedUser.id,
          // role: typedUser.role,
          id: user.id,
          role: user.role,
          // customKey: typedUser.customKey,
        };
      }
      // this token is used in the session, so the session now can access custom properties
      return token;
    },
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token });

      // accessing custom properties from the jwt token we defined below in the jwt callback
      // and adding them into the session so they are always available
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          // customKey: token.customKey,
        },
      };
    },
  },
};
