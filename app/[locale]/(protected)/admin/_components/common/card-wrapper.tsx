import { Header } from "@/components/auth/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  subHeaderLabel?: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  subHeaderLabel,
}: CardWrapperProps) => {
  return (
    <div className="w-full border-none  !rounded-xl !bg-[var(--clr-primary)]">
      {/* <div className=" col-span-1 md:col-span-3 bg-[var(--clr-primary-light)]  px-8 pb-1 md:pb-2 pt-1 md:pt-16  flex flex-row md:flex-col items-center justify-center md:items-center md:justify-between md:h-[100%]">
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
      </div> */}
      <div className=" rounded-none !bg-[var(--clr-primary)]">
        <Card className="w-full rounded-none min-  max-h-[96vh] overflow-y-auto no-scrollbar flex flex-col justify-between relative">
          {headerLabel && (
            <CardHeader className="!bg-[var(--clr-primary)] sticky top-0 left-0 right-0 z-[1]">
              <Header label={headerLabel} subLabel={subHeaderLabel} />
            </CardHeader>
          )}

          <div className="mb-5">
            <CardContent>{children}</CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};
