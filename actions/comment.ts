"use server";

import * as z from "zod";

// import { getUserByEmail } from "@/data/user";
// import { sendPasswordResetEmail } from "@/lib/mail";
// import { generatePasswordResetToken } from "@/lib/tokens";
import { CommentSchema } from "@/schemas";

export const comment = async (values: z.infer<typeof CommentSchema>) => {
  const validatedFields = CommentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid comment!" };
  }

  const { comment } = validatedFields.data;

  // const existingUser = await getUserByEmail(email);

  // if (!existingUser) {
  //   return { error: "Email not found!" };
  // }

  // const passwordResetToken = await generatePasswordResetToken(email);
  // await sendPasswordResetEmail(
  //   passwordResetToken.email,
  //   passwordResetToken.token,
  //   locale
  // );

  return { success: "You have Successfully sent your Comment!" };
};
