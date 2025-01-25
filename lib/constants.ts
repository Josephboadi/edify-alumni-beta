export const USER_TOKEN = "SessionToken";

const JWT_SECRET_KEY = process.env.TOKEN_SECRET;

export function getJwtSecretKey() {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY?.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set.");
  }

  return JWT_SECRET_KEY;
}