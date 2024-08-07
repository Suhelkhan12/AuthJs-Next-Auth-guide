import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { prisma } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/twofactor-confirmation";
import { getAccountByUserId } from "./data/account";

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
      if (existingUser.isTwoFactorEnabled) {
        const twoFActorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFActorConfirmation) return false;

        // Delete two factor confirmation for next signin
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: twoFActorConfirmation.id,
          },
        });
      }
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

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      // this is being done here because I am updating these things from settings and to show it in ui
      token.name = existingUser.name;
      token.email = existingUser.email;

      token.role = existingUser.role;

      // for extending 2FA
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
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
