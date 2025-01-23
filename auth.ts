import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { getAccountByUserId } from "./data/account";
import { generateSessionToken } from "./lib/tokens";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.user_id = token.user_id as string;
        session.user.name = token.name;
        session.user.phone_numbers = token.phone_numbers as string;
        session.user.country = token.country as string;
        session.user.school = token.school as string;
        session.user.year = token.year as string;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.token = token.jti as string;
      }

      if (token.sub && session.user) {
        await generateSessionToken(
          token.sub,
          session.expires,
          token.jti as string
        );
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.user_id);

      token.isOAuth = !!existingAccount;
      token.user_id = existingUser.user_id;
      token.name = existingUser.name;
      token.phone_numbers = existingUser.phone_numbers;
      token.country = existingUser?.country_of_res_id;
      token.school = existingUser?.school_id;
      token.year = existingUser?.year;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt", maxAge: 20 * 60 },
  ...authConfig,
});
