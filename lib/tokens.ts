import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { auth, signOut } from "@/auth";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getSessionByID } from "@/data/session-id";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getVerificationTokenByEmail } from "@/data/verificiation-token";
import { db } from "@/lib/db";
import { createToken } from "./session";

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

export const generateSessionToken = async () => {
  let sessionData;
  const authData = await auth();
  // console.log(
  //   "authData from generateSessionToken===============================, ",
  //   authData
  // );

  if (authData) {
    const existingToken = await getSessionByID(authData?.user.id);
    if (existingToken) {
      const hasExpired = new Date(existingToken.expires) < new Date();
      // console.log(
      //   "hasExpired======================================, ",
      //   hasExpired
      // );
      if (hasExpired) {
        await db.session.delete({
          where: {
            id: existingToken.id,
          },
        });
        await signOut();
        window.location.reload();
        return;
      } else {
        const now = new Date(); // Current date and time
        const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours in milliseconds
        sessionData = await db.session.update({
          data: { expires: twoHoursLater },
          where: {
            id: existingToken.id,
          },
        });
      }
    }
  }

  return sessionData;
};

export const createSessionToken = async (user_id: string) => {
  const existingToken = await getSessionByID(user_id);
  if (existingToken) {
    await db.session.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const token = await createToken();
  const now = new Date(); // Current date and time
  const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours in milliseconds
  await db.session.create({
    data: {
      user_id,
      token,
      expires: twoHoursLater,
    },
  });

  // return sessionToken;
};

export const deleteSessionToken = async () => {
  const authData = await auth();
  if (authData) {
    const existingToken = await getSessionByID(authData?.user.id);
    if (existingToken) {
      await db.session.delete({
        where: {
          id: existingToken.id,
        },
      });
    }
    await signOut();
    window.location.reload();
  }
};
