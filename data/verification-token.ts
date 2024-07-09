import { prisma } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    // get verification token from db
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (err) {
    console.log(err);
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    // get verification token from db
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch (err) {
    console.log(err);
  }
};
