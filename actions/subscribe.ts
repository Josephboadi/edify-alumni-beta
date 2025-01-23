"use server";

import * as z from "zod";

// import { getUserByEmail } from "@/data/user";
// import { sendPasswordResetEmail } from "@/lib/mail";
// import { generatePasswordResetToken } from "@/lib/tokens";
import { SubscribeSchema } from "@/schemas";

export const subscribe = async (values: z.infer<typeof SubscribeSchema>) => {
  const validatedFields = SubscribeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;

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

  return { success: "You have Successfully Subscribe to our news letter!" };
};
