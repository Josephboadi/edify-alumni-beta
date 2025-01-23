"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  // children: React.ReactNode;
  href: string;
  label: string;
  // mode?: "modal" | "redirect";
  // locale: string;
  // asChild?: boolean;
}

export const BackButton = ({
  // children,
  href,
  label,
}: // mode = "redirect",
// locale,
// asChild,
BackButtonProps) => {
  // const router = useRouter();
  // const { setFormType, formType } = useAppStore();

  // const onClick = () => {
  //   router.push(`/${locale}/auth/login`);
  // };

  // if (mode === "modal") {
  //   return (
  //     <Dialog>
  //       <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
  //       <DialogContent className="p-0  w-max  flex items-center justify-center bg-transparent border-none !z-[10000000] max-h-[96vh] overflow-y-auto no-scrollbar shadow-lg">
  //         {formType === "login" ? (
  //           <LoginForm locale={locale} />
  //         ) : (
  //           <RegisterForm locale={locale} />
  //         )}
  //       </DialogContent>
  //     </Dialog>
  //   );
  // }

  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>

    // label === "Don't have an account?" ? (
    //   <Button
    //     onClick={() => setFormType("register")}
    //     variant="link"
    //     size="sm"
    //     className="font-normal w-full"
    //   >
    //     {label}
    //   </Button>
    // ) : (
    //   <Button
    //     onClick={() => setFormType("login")}
    //     variant="link"
    //     size="sm"
    //     className="font-normal w-full"
    //   >
    //     {label}
    //   </Button>
    // )
    // <span onClick={onClick} className="cursor-pointer">
    //   {children}
    // </span>
  );
};
