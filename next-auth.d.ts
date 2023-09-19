import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string[];
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string[];
  }
}

// // extending Prisma User type to add custom properties to be used in session
// interface ICustomPropertiesUser extends User {
//   customKey: String;
// }
