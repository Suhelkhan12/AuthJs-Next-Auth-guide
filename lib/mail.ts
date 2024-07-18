import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// for sending verfication email to user
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email for AuthJs by Suhel khan",
    html: `<p>Click <a href="${confirmLink}">here</a>  to confirm email.</p>`,
  });
};

// for sending reset password verfication to user
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset you password by Suhel khan",
    html: `<p>Click <a href="${resetLink}">here</a>  to reset password.</p>`,
  });
};

// for sending two factor authentication verification email to user
export const sendTwoFactorAuthEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two factor authentication for AuthJs by Suhel khan. ",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};
