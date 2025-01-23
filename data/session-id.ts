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
