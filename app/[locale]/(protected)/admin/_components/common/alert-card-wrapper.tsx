import { Header } from "@/components/auth/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AlertCardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  subHeaderLabel?: string;
}

export const AlertCardWrapper = ({
  children,
  headerLabel,
  subHeaderLabel,
}: AlertCardWrapperProps) => {
  return (
    <div className="w-full  !border-none !shadow-none bg-[var(--clr-secondary)] !rounded-xl">
      <div className=" rounded-none ">
        <Card className="w-full flex-1 !rounded-none  flex flex-col gap-4 relative !shadow-none !border-0 ">
          {headerLabel && (
            <CardHeader className="!bg-[var(--clr-primary)] sticky top-0 left-0 right-0 z-[1]">
              <Header label={headerLabel} subLabel={subHeaderLabel} />
            </CardHeader>
          )}

          <div className="">
            <CardContent className="shadow-none ">{children}</CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};
