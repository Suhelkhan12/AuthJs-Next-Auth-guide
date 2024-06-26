import { prisma } from "@/lib/db";

// checking unique email :- it will give us the user with email for user trying to use same email to register
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (err: any) {
    console.log(err);
  }
};

// for getting user by id
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (err: any) {
    console.log(err);
  }
};
