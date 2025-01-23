import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { LanguageForm } from "./LanguageForm";

interface LanguageButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LanguageButton = ({
  children,
  mode = "modal",
  asChild,
}: LanguageButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none !z-[10000000]">
        <LanguageForm />
      </DialogContent>
    </Dialog>
  );
};
