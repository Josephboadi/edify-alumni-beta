"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";

const Navbar = ({ locale }: any) => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === `/${locale}/server` ? "default" : "outline"}
        >
          <Link href={`/${locale}/server`}>Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === `/${locale}/client` ? "default" : "outline"}
        >
          <Link href={`/${locale}/client`}>Client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === `/${locale}/admin` ? "default" : "outline"}
        >
          <Link href={`/${locale}/admin`}>Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === `/${locale}/settings` ? "default" : "outline"}
        >
          <Link href={`/${locale}/settings`}>Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
export default Navbar;
