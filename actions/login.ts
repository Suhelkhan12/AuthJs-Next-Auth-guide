"use server";

import { LoginSchemaType } from "@/schemas/indes";

const wait = async (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const login = async (values: LoginSchemaType) => {
  await wait(2000);
  console.log(values);
};
