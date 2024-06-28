import Github from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

// this is just an object not an auth.js instance
export default {
  providers: [Github],
} satisfies NextAuthConfig;
