import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    firstName?: string;
    lastName?: string;
  }
  interface Session {
    user: User & {
      email: string;
      firstName?: string;
      lastName?: string;
    };
    token: {
      email: string;
      firstName?: string;
      lastName?: string;
    };
  }
}
