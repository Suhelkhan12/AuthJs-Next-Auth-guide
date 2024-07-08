"use server";

import { AuthError } from "next-auth";
import { LoginSchema, LoginSchemaType } from "@/schemas/indes";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

export const login = async (values: LoginSchemaType) => {
  /**
   * this is where we are doing server side validations. Because remember client side validations can always be bypassed.
   */
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    // I can signin using 3part apps here too just had to change credentials to that party.
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin": {
          return { error: "Invalid credentials." };
        }
        default:
          return { error: "Something went wrong." };
      }
    }

    throw err;
  }
};
