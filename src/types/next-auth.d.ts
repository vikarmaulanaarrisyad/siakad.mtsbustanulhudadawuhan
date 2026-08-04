import { DefaultSession, DefaultUser } from "next-auth";
import { Role } from "../generated/prisma2/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role | string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: Role | string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role | string;
  }
}
