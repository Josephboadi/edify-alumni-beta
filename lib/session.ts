import { db } from "./db";

export async function verifyAuth(token: string) {
  try {
    const sessionToken = await db.verificationToken.findUnique({
      where: { token },
    });
    if (!sessionToken) {
      return { error: "Authentication Failed" };
    }

    const hasExpired = new Date(sessionToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Authentication Failed" };
    }

    return { success: "Authentication Successful" };
  } catch (err) {
    return { error: "Authentication Failed" };
  }
}
