import { db } from "@/lib/db";

export const getSessionByID = async (user_id: string) => {
  try {
    const session = await db.session.findFirst({
      where: { user_id },
    });

    return session;
  } catch {
    return null;
  }
};

export const getSessionUserByEmail = async (email: string) => {
  try {
    const userdata = await db.user.findUnique({
      where: { email },
    });

    return userdata;
  } catch (err) {
    return null;
  }
};

export const getSessionByToken = async (token: string) => {
  try {
    const session = await db.session.findFirst({
      where: { token },
    });

    return session;
  } catch {
    return null;
  }
};
