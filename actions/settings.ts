"use server";

import { prisma } from "@/lib/db";
import { SettingsSchemaType } from "@/schemas/indes";
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificatonToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values: SettingsSchemaType) => {
  const user = await currentUser();

  // checking if user exists
  if (!user) {
    return { error: "Unauthorised" };
  }

  // checking if user exists in database.
  const dbUser = await getUserById(user.id!);

  // checking if user exists in db
  if (!dbUser) {
    return { error: "Unauthorised" };
  }

  // check if user is oAuth then many things are going to be undefined because they will be using third party login to do so
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // user tryig to change email
  if (values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email!);
    // if user exists with email
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use." };
    }

    const verificationToken = await generateVerificatonToken(values.email!);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent." };
  }

  // if user is updating password then we will check if pass entered by them matches with our password or not.
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatched = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatched) {
      return { error: "Incorred password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  /**
   *
   * we can call update handleer here on server side as well
   *  const udpatedUser = await prisma.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  update({
    user: {
      name: udpatedUser.name,
    },
  });
   */

  return { success: "Settings updated." };
};
