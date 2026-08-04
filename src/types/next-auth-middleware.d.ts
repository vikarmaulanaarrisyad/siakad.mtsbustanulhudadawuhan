import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth/middleware" {
  interface NextRequestWithAuth {
    nextauth: {
      token: {
        id: string;
        role: string;
      }
    }
  }
}
