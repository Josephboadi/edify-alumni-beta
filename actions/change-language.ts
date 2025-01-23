"use server";

import { cookies } from "next/headers";
export const changelanguage = async (language: string, locale: string) => {
  //   const language = await getUserByEmail(email);
  // ;
  cookies().set("NEXT_LOCALE", language);
  return;
  // return await axios.post(`/${locale}/api/changelang`, language, {
  //   headers: { "Content-Type": "application/json" },
  //   withCredentials: true,
  // });
  //   return { success: "Confirmation email sent!" };
};
