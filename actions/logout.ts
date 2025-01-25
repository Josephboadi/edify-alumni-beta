"use server";

// import { signOut } from "@/auth";
import { deleteSessionToken } from "@/lib/tokens";

export const logout = async () => {
  await deleteSessionToken();
};
