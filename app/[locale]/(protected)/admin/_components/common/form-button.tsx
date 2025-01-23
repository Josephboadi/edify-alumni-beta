"use client";


import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";


interface FormButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
  Form: any
}

export const FormButton = ({
  children,
  asChild,
  Form
}: FormButtonProps) => {

  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="!p-0 !m-0  w-max  flex items-center justify-center !bg-transparent border-none !z-[10000000] max-h-[96vh] overflow-y-auto no-scrollbar shadow-lg !rounded-xl">
        <Form />
      </DialogContent>
    </Dialog>
  );
};
