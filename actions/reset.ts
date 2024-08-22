"use server";
import { ResetSchema, ResetSchemaType } from "@/schemas/indes";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";

export const reset = async (values: ResetSchemaType) => {
  const validatedFields = ResetSchema.safeParse(values);

  // server side validation
  if (!validatedFields) return { error: "Invalid email!" };

  console.log({ validatedFields });
  const { email } = validatedFields.data!;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "No user found." };

  // reset password logic here
  const passwordResetToken = await generatePasswordResetToken(email);
  // sending email
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
