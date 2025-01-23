import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  user_id: string;
  country: string;
  phone_numbers: string;
  school: string;
  year: string;
  token: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
