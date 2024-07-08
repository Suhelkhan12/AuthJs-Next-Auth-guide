import { type DefaultSession } from "next-auth";
// eslint-disable-next-line no-unused-vars
import { JWT } from "next-auth/jwt";

import { UserRole } from "@prisma/client";

export type ExtenedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: ExtenedUser;
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    role?: UserRole;
  }
}
