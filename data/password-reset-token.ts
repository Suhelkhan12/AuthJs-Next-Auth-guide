import { prisma } from "@/lib/db";

export const getPasswordResetByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.resetPassword.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch (err) {
    return null;
  }
};

export const getPasswordResetByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.resetPassword.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch (err) {
    return null;
  }
};
