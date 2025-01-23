"use client";

import { useParams, useRouter } from "next/navigation";

import { RegisterForm } from "@/components/auth/register-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface RegisterButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const RegisterButton = ({
  children,
  mode = "redirect",
  asChild,
}: RegisterButtonProps) => {
  const router = useRouter();
  const { locale } = useParams();
  const onClick = () => {
    if (locale === "en") {
      router.push(`/auth/login`);
    } else {
      router.push(`/${locale}/auth/login`);
    }
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0  w-max  flex items-center justify-center bg-transparent border-none !z-[10000000] max-h-[96vh] overflow-y-hidden no-scrollbar shadow-lg !rounded-xl">
          <div className="h-[96vh] overflow-y-auto no-scrollbar">
            <RegisterForm />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
