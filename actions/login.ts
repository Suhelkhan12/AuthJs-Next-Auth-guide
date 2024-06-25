"use server";

import { LoginSchema, LoginSchemaType } from "@/schemas/indes";

const wait = async (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const login = async (values: LoginSchemaType) => {
  // waiting for 2 seconds
  await wait(2000);
  /**
   * this is where we are doing server side validations. Because remember client side validations can always be bypassed.
   */
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Email sent!", data: values };
};
