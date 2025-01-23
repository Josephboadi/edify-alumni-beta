import sendEmail from "@/services/mailServices";
import { OtpEmail } from "@/template/otpEmail";
import { render } from "@react-email/render";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject: "2FA Code",
  //   html: `<p>Your 2FA code: ${token}</p>`,
  // });

  await sendEmail({
    to: email,
    subject: "2FA Code",
    html: render(OtpEmail({ token: token })),
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  locale: string
) => {
  const checklocale = locale === "en" ? "" : `/${locale}`;
  const resetLink = `${domain}${checklocale}/auth/new-password?token=${token}`;

  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject: "Reset your password",
  //   html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  // });

  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  locale: string
) => {
  const checklocale = locale === "en" ? "" : `/${locale}`;
  const confirmLink = `${domain}${checklocale}/auth/new-verification?token=${token}`;

  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject: "Confirm your email",
  //   html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  // });

  await sendEmail({
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
