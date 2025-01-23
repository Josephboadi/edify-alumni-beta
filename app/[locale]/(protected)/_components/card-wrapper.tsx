"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Header } from "./header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  subHeaderLabel?: string;
  mainImageUrl?: string;
  subImageUrl?: string;
  type?: "normal" | "service";
}

export const CardWrapper = ({
  children,
  headerLabel,
  subHeaderLabel,
  mainImageUrl,
  subImageUrl,
  type = "normal",
}: CardWrapperProps) => {
  // const { setOpen } = useAppStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 w-[320px] xs:w-[360px] sm:w-[400px] md:w-[700px]  border-none min-h-[520px] !rounded-xl relative">
      {/* <Button
        size={"icon"}
        variant={"ghost"}
        className="absolute right-3 top-3 w-5 h-5 flex items-center justify-center z-[2]"
        onClick={() => setOpen()}
      >
        <MdClose className="text-lg" />
      </Button> */}
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
          <div className="hidden md:block">
            {mainImageUrl &&
              (type === "normal" ? (
                <div
                  className={`w-[200px] h-[200px] ${subImageUrl ? "" : "border-4 border-[var(--clr-primary)]"}  relative rounded-full`}
                >
                  <Image
                    src={mainImageUrl}
                    fill
                    alt="-"
                    className=" object-contain"
                  />
                  {subImageUrl && (
                    <div className="absolute w-[130px] h-[130px] bottom-[-36px] right-[-25px]">
                      <div className="w-full h-full relative border-4 border-[var(--clr-primary)] rounded-full">
                        <Image
                          src={subImageUrl}
                          fill
                          alt="-"
                          className=" object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {!subImageUrl && (
                    <div className="absolute w-[18px] h-[18px] bg-[var(--clr-secondary-light)] shadow-lg top-[17px] left-[18px] rounded-full" />
                  )}
                </div>
              ) : (
                <div
                  className={`w-[200px] h-[200px] border-4 border-[var(--clr-green)]  relative rounded-full p-10 flex items-center justify-center bg-[var(--clr-silver)]`}
                >
                  <Image
                    src={mainImageUrl}
                    width={100}
                    height={100}
                    alt="-"
                    className=" object-contain w-[140px] h-[140px] rounded-full"
                  />
                </div>
              ))}
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
        <Card className="w-full rounded-none h-full max-h-[76vh] md:max-h-[96vh] overflow-y-auto no-scrollbar flex flex-col justify-between bg-[var(--clr-primary)] relative">
          <CardHeader className="!bg-[var(--clr-primary)] sticky top-0 left-0 right-0 z-[1]">
            <Header label={headerLabel} subLabel={subHeaderLabel} />
          </CardHeader>
          <div>
            <CardContent>{children}</CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};
