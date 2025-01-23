"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { JobApplicationForm } from "./jobapplication-form";

interface JobApplicationButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const JobApplicationButton = ({
  asChild,
  children,
}: JobApplicationButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="p-0  w-max  flex items-center justify-center bg-transparent border-none max-h-[96vh] overflow-y-auto no-scrollbar shadow-lg !rounded-xl">
        <JobApplicationForm />
      </DialogContent>
    </Dialog>
  );
};
