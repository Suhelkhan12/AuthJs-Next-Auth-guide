import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetByEmail } from "@/data/password-reset-token";
import { prisma } from "@/lib/db";

import { v4 as uuidV4 } from "uuid";
// uuid package hmara unique token dega hume harbar
export const generateVerificatonToken = async (email: string) => {
  const token = uuidV4();
  // token will exprire in 1 hour this in millisecond
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  // here we are checking that if the token which is generate by uuid is already sent to db if it is sent then find that token and delete it. taki bs unique token hi aaye apne db me.
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // other wise if verification token is not sent then create a new verification token using the newly generated token in our db.
  const verficationToken = await prisma.verificationToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return verficationToken;
};

// to generate a token for reseting the password
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidV4();

  // token will exprire in 1 hour this in millisecond
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetByEmail(email);

  if (existingToken) {
    await prisma.resetPassword.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await prisma.resetPassword.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
