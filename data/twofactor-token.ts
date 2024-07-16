import { prisma } from "@/lib/db";

export const getTwoFactorTokenBytoken = async (token: string) => {
  try {
    const twoFactorToekn = await prisma.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToekn;
  } catch (err) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToekn = await prisma.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToekn;
  } catch (err) {
    return null;
  }
};
