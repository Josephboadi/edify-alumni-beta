import { SignJWT } from "jose";
import { getJwtSecretKey } from "./constants";
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

export async function createToken() {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    // .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(getJwtSecretKey()));

  return token;
}
