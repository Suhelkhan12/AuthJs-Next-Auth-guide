// this will be used to get user condition in a server component
import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};
