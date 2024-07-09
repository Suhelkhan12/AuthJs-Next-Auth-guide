"use server";

import { AuthError } from "next-auth";
import { LoginSchema, LoginSchemaType } from "@/schemas/indes";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { generateVerificatonToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: LoginSchemaType) => {
  /**
   * this is where we are doing server side validations. Because remember client side validations can always be bypassed.
   */
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  // checking if user already exist in our db
  const existingUser = await getUserByEmail(email);

  // this we are doing so that registerd user without verifying theri email do not login with OAuth providers.
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  // if userexist but it's email is not verified then we will generate new token
  if (existingUser && !existingUser.emailVerified) {
    const verficationToken = await generateVerificatonToken(existingUser.email);

    await sendVerificationEmail(verficationToken.email, verficationToken.email);

    // here we will not even attempt to signin
    return { success: "Please confirm your email." };
  }

  try {
    // I can signin using 3part apps here too just had to change credentials to that party.
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    // TODO
    // return { success: "Email found. Logging in." };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin": {
          return { error: "Something went wrong." };
        }
        default:
          return { error: "Something went wrong." };
      }
    }

    throw err;
  }
};
