import { z } from "zod";

/**
 *
 *  always remember during login never limit the password on register it is fine to do that. Because some users might have created their accounts before these validations are implemented
 */
// LOGIN SCHEMA
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;
