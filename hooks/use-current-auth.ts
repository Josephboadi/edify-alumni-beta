import { useSession } from "next-auth/react";

export const useCurrentAuth = () => {
  const session = useSession();

  // return session;
  return session;
};
