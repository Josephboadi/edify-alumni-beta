import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

interface HeaderProps {
  label: string;
  subLabel?: string;
}

export const Header = ({ label, subLabel }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-2 items-center justify-center">
      <h1
        className={cn(
          "text-2xl mt-2 font-semibold capitalize text-center",
          font.className
        )}
      >
        {label}
      </h1>
      <p className="text-muted-foreground text-sm text-center">{subLabel}</p>
    </div>
  );
};
