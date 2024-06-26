"use server";

import { RegisterSchema, RegisterSchemaType } from "@/schemas/indes";
import { wait } from "./wait";

export const register = async (values: RegisterSchemaType) => {
  // waitng for 2 second
  await wait(2000);

  const isValidatedFields = RegisterSchema.safeParse(values);

  if (!isValidatedFields.success) {
    return { error: "Something went wrong!" };
  }

  return {
    success: "You are registered successfully",
    data: values,
  };
};
