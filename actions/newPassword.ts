"use server";
import bcrypt from "bcryptjs";

import { getPasswordResetByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema, NewPasswordSchemaType } from "@/schemas/indes";
import { prisma } from "@/lib/db";

export const newPassword = async (
  values: NewPasswordSchemaType,
  token: string | null
) => {
  // when user has no token assosiated to it.
  if (!token) return { error: "Missing token!" };

  // server side field validations
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields) return { error: "Invalid fields!" };
  const { password } = validatedFields.data!;

  // db se password resset ka token nikala
  const existingToken = await getPasswordResetByToken(token);
  if (!existingToken) return { error: "Invalid token!" };

  // checking for expiry of token
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "User token has expired!" };

  // checking current user from token email
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "User not found!" };

  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  // deleting token which is used to update the password
  await prisma.resetPassword.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Your password has been reset." };
};
