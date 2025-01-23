"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import { FaSpinner, FaUser } from "react-icons/fa";

import { LogoutButton } from "@/components/auth/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Suspense, useEffect, useState } from "react";

export const UserButton = () => {
  const user = useCurrentUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid rehydration errors

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <Suspense fallback={<FaSpinner className="animate-spin" />}>
            <AvatarImage src={user?.image || ""} />
          </Suspense>
          <AvatarFallback className="bg-gray-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
