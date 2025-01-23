"use client";

import { useAppStore } from "@/store/store";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  subHeaderLabel?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  subHeaderLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  const { setFormType, formType } = useAppStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 w-[320px] xs:w-[360px] sm:w-[400px] md:w-[700px]  border-none min-h-[520px] !rounded-xl">
      <div className=" col-span-1 md:col-span-3 bg-[var(--clr-primary-light)]  px-8 pb-1 md:pb-2 pt-1 md:pt-16  flex flex-row md:flex-col items-center justify-center md:items-center md:justify-between md:h-[100%]">
        <div className="w-full flex flex-col justify-between items-center md:h-[320px]">
          <div className="w-[200px] h-[100px] relative">
            <Image
              src={"/translogo.png"}
              fill
              alt="-"
              className=" object-contain"
            />
          </div>
          <div className=" hidden md:block w-[200px] h-[200px] border-4 border-[var(--clr-primary)] relative rounded-full">
            <Image
              src={"/formimage.png"}
              fill
              alt="-"
              className=" object-contain"
            />
            <div className="absolute w-[18px] h-[18px] bg-[var(--clr-secondary-light)] shadow-lg top-[17px] left-[18px] rounded-full" />
          </div>
        </div>

        <div className=" hidden md:block w-[80px] h-[40px]  relative">
          <Image
            src={"/edifylogo.png"}
            fill
            alt="-"
            className=" object-contain"
          />
        </div>
      </div>
      <div className="col-span-1 md:col-span-4 rounded-none h-full">
        <Card className="w-full rounded-none h-full max-h-[76vh] md:max-h-[96vh] overflow-y-auto no-scrollbar flex flex-col justify-between relative">
          <CardHeader className="!bg-[var(--clr-primary)] sticky top-0 left-0 right-0 z-[1]">
            <Header label={headerLabel} subLabel={subHeaderLabel} />
          </CardHeader>
          <div>
            <CardContent>{children}</CardContent>
            {showSocial && (
              <CardFooter>
                <Social />
              </CardFooter>
            )}
          </div>

          <CardFooter>
            {/* <BackButton label={backButtonLabel} href={backButtonHref} /> */}
            {backButtonLabel === "Don't have an account?" &&
            formType === "login" ? (
              // <RegisterButton asChild mode="modal">
              <Button
                onClick={() => setFormType("register")}
                variant="link"
                size="sm"
                className="font-normal w-full"
              >
                {backButtonLabel}
              </Button>
            ) : backButtonLabel === "Already have an account?" &&
              formType === "register" ? (
              // {/* <LoginButton asChild mode="modal">
              //   {children}
              // </LoginButton> */}

              //   {/* : backButtonLabel === "Already have an account?" ? (
              // <LoginButton asChild mode="modal">
              //   {children}
              // </LoginButton>
              //   ) */}
              // <Button
              //   onClick={() => setFormType("login")}
              //   variant="link"
              //   size="sm"
              //   className="font-normal w-full"
              // >
              //   {backButtonLabel}
              // </Button>
              // <RegisterButton asChild mode="modal">
              //   {children}
              // </RegisterButton>
              // <LoginButton asChild locale={locale} mode="modal">
              <Button
                onClick={() => setFormType("login")}
                variant="link"
                size="sm"
                className="font-normal w-full"
              >
                {backButtonLabel}
              </Button>
            ) : backButtonLabel === "Already have an account?" ? (
              <BackButton label={backButtonLabel} href={backButtonHref} />
            ) : backButtonLabel === "Don't have an account?" ? (
              <BackButton label={backButtonLabel} href={backButtonHref} />
            ) : (
              <BackButton label={backButtonLabel} href={backButtonHref} />
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
