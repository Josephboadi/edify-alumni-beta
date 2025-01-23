import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AlertButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
  Form: any;
  isAlert?: true | false;
}

export const AlertButton = ({
  children,
  asChild,
  Form,
  isAlert = false,
}: AlertButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="p-0  w-max  flex flex-col items-center justify-center bg-[var(--clr-primary)] !border-none  h-[400px] min-h-[400px]  overflow-y-hidden no-scrollbar !shadow-none !rounded-xl">
        <Form />

        {isAlert && (
          <DialogFooter className="px-[20px] w-full h-[50px] mb-6 !mt-0 !pt-0 gap-4 flex items-center justify-between !border-none shadow-none !bg-[var(--clr-primary)]">
            <DialogClose asChild className="p-0 m=0">
              <Button
                // disabled={isPending}
                type="button"
                variant={"ghost"}
                className="w-full bg-slate-100 hover:border-[1px] hover:border-[var(--clr-secondary)] text-[var(--clr-secondary)]"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              // disabled={isPending}
              //   type="submit"
              className="w-full bg-[var(--clr-secondary)] text-[var(--clr-primary)]"
            >
              Confirm
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
