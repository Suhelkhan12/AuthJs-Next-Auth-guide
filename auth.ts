import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserById } from "./data/user";
import authConfig from "@/auth.config";

import { prisma } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    // there are many callbacks please read old documentation for better understanding

    /**
     *
     * agar jwt me token me kuch bhi update kra to vo session me automatically phoch jayga hum custom fields bhi add kr skte hai agar hum chahe to krna
     */

    async jwt({ token }) {
      if (!token.sub) return token;
      // sub field in the user will have id of that user.
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
