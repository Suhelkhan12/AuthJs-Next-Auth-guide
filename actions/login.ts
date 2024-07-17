"use server";

import { AuthError } from "next-auth";
import { LoginSchema, LoginSchemaType } from "@/schemas/indes";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { generateVerificatonToken, generateTwoFactorToken } from "@/lib/tokens";
import { getTwoFactorTokenByEmail } from "@/data/twofactor-token";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorAuthEmail } from "@/lib/mail";
import { prisma } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/twofactor-confirmation";

export const login = async (values: LoginSchemaType) => {
  /**
   * this is where we are doing server side validations. Because remember client side validations can always be bypassed.
   */
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, code } = validatedFields.data;

  // checking if user already exist in our db
  const existingUser = await getUserByEmail(email);

  // this we are doing so that registerd user without verifying theri email do not login with OAuth providers.
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  // if userexist but it's email is not verified then we will generate new token
  if (existingUser && !existingUser.emailVerified) {
    const verficationToken = await generateVerificatonToken(existingUser.email);

    await sendVerificationEmail(verficationToken.email, verficationToken.token);

    // here we will not even attempt to signin
    return { success: "Please confirm your email." };
  }

  // for sending 2FA code
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      console.log(code);
      // checking if two factor token entered by user exist in our db our not
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      // if there is no token
      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      // if token entered by user does not match with one in our db
      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      // if token has expired
      if (twoFactorToken.expires < new Date()) {
        return { error: "2FA token expired!" };
      }

      // finally if token matches we can remove token
      await prisma.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      // checking for already existing confirmation
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      // deleting the confirmation
      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      // here creating two factor confirmation if it doesn't exist
      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      // send two factor code just because if user hasn't got any 2F code
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorAuthEmail(twoFactorToken.email, twoFactorToken.token);

      // for displaying a screen to user to enter 2FA code sent to his email
      return { twoFactor: true };
    }
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
