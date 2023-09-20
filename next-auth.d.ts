import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roles: string[];
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    roles: string[];
  }

  interface AdapterUser extends User {
    id: string;
    email: string;
    emailVerified: Date | null;
    roles: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    roles: string[];
  }
}
