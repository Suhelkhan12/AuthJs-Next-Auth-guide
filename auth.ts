import NextAuth from "next-auth";
import { prisma } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserById } from "./data/user";
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    // there are many callbacks please read old documentation for better understanding

    async signIn({ user, account }) {
      // allow Oauth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      // if user's emails is not verified they will not be signedin
      if (!existingUser?.emailVerified) return false;

      // TODO add 2FA check
      return true;
    },
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
      console.log({ jwt: token });
      return token;
    },
    async session({ session, token }) {
      console.log({ session: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  /**
   * this pages objec is used to add error page , signin page and other pages read docs
   */
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
