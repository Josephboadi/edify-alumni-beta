import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { signOut } from "@/auth";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getSessionByID } from "@/data/session-id";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getVerificationTokenByEmail } from "@/data/verificiation-token";
import { db } from "@/lib/db";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (
  email: string,
  user_id: string
) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      user_id,
      token,
      expires,
    },
  });

  return verficationToken;
};

export const generateSessionToken = async (
  user_id: string,
  expires: string,
  token: string
) => {
  let sessionToken;
  const existingToken = await getSessionByID(user_id);
  // console.log("EXISTINGTOKEN===============================, ", existingToken);
  if (existingToken) {
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      await db.session.delete({
        where: {
          id: existingToken.id,
        },
      });
      await signOut();
      return;
    } else {
      sessionToken = await db.session.update({
        data: { expires },
        where: {
          id: existingToken.id,
        },
      });
    }
  } else {
    sessionToken = await db.session.create({
      data: {
        user_id,
        token,
        expires,
      },
    });
  }

  return sessionToken;
};
