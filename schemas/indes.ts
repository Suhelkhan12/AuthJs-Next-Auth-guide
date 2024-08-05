import { UserRole } from "@prisma/client";
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
  code: z.optional(z.string()),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

// REGISTER SCHEMA
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required.",
  }),
  password: z.string().min(8, {
    message: "Password must contain min 8 characters.",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

// RESET  SCHEMA
export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required.",
  }),
});
export type ResetSchemaType = z.infer<typeof ResetSchema>;

// RESET PASSWORD SCHEMA SCHEMA
export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must contain min 8 characters.",
  }),
});
export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;

// SETTINGS SCHEMA
export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required.",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required.",
      path: ["password"],
    }
  );

export type SettingsSchemaType = z.infer<typeof SettingsSchema>;
