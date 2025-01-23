"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ServiceRequestForm } from "./servicerequest-form";

interface ServiceRequestButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const ServiceRequestButton = ({
  asChild,
  children,
}: ServiceRequestButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="p-0  w-max  flex items-center justify-center bg-transparent border-none max-h-[96vh] overflow-y-auto no-scrollbar shadow-lg !rounded-xl">
        <ServiceRequestForm />
      </DialogContent>
    </Dialog>
  );
};
