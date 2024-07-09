"use server";

import { RegisterSchema, RegisterSchemaType } from "@/schemas/indes";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/data/user";
import { generateVerificatonToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: RegisterSchemaType) => {
  const isValidatedFields = RegisterSchema.safeParse(values);

  if (!isValidatedFields.success) {
    return { error: "Something went wrong!" };
  }

  const { email, password, name } = isValidatedFields.data;
  // we will hash the password because of security reasons
  const hashedPassword = await bcrypt.hash(password, 10);

  // checking unique email :- it will give us the user with email for user trying to use same email to register
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // when the user with email is not found is not found in db.
  // password:hashedPassword becoz we can not send direct password of user to db for security reasons.
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // sending verification token
  const verficationToken = await generateVerificatonToken(email);

  // sending verification email
  await sendVerificationEmail(verficationToken.email, verficationToken.token);

  return {
    success: "Confirmation email has been sent.",
  };
};
