"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/schemas";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  locale: any
) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, phoneNumber, password, name, country, school, year } =
    validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const newUser = await db.user.create({
    data: {
      name,
      email,
      phone_numbers: phoneNumber,
      // country_of_res_id: country,
      // school_id: school,
      year,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email, newUser.id);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    locale
  );

  return { success: "Confirmation email sent!" };
};
