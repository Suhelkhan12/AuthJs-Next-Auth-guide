import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "./schemas/indes";
import { getUserByEmail } from "./data/user";

// this is just an object not an auth.js instance
export default {
  providers: [
    Credentials({
      // this authorize will have login credectials passed to it.
      async authorize(credentials) {
        // validating the schema here is also necessory because user can easily bypass our server side validation also.
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          /**
           * I might think that how is this possible that agar user hi exist nahi krta to hume kya zaroorat hai password check kr ne ki. Ye tab use hoga jab 3rd party login kiya jayga
           */
          if (!user || !user.password) return null;

          // if user exists then we will compare hashed pass from our db with user entered password
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
