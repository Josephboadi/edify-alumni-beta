import { Header } from "@/components/auth/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ImageWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  subHeaderLabel?: string;
}

export const ImageWrapper = ({
  children,
  headerLabel,
  subHeaderLabel,
}: ImageWrapperProps) => {
  return (
    <div className="w-full border-none  !rounded-xl !bg-[var(--clr-primary)]">
      <div className=" rounded-none !bg-[var(--clr-primary)]">
        <Card className="w-full rounded-none max-h-[96vh] overflow-y-auto no-scrollbar flex flex-col justify-between !p-0 relative shadow-none">
          {headerLabel && (
            <CardHeader className="!bg-[var(--clr-primary)] px-5 sticky top-0 left-0 right-0 z-[1]">
              <Header label={headerLabel} subLabel={subHeaderLabel} />
            </CardHeader>
          )}

          <div className="">
            <CardContent className="!p-0 !rounded-xl">{children}</CardContent>
          </div>

        </Card>
      </div>
    </div>
  );
};
