import { getVerificationTokenByEmail } from "@/data/verification-token";
import { prisma } from "@/lib/db";

import { v4 as uuidV4 } from "uuid";
// uuid package hmara unique token dega hume harbar
export const generateVerificatonToken = async (email: string) => {
  const token = uuidV4();
  // token will exprire in 1 hour this i millisecond
  const expires = new Date(new Date().getTime() + 3600 + 1000);

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
