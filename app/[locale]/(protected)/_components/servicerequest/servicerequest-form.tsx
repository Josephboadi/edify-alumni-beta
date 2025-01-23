"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// import { jobApplication } from "@/actions/jobApplication";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ServiceRequestSchema } from "@/schemas";
import { useAppStore } from "@/store/store";
import { CardWrapper } from "../card-wrapper";

export const ServiceRequestForm = () => {
  const { jobInfoData } = useAppStore();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ServiceRequestSchema>>({
    resolver: zodResolver(ServiceRequestSchema),
    defaultValues: {
      requesttitle: "Councelling Service",
      reason: "",
      additionalNote: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ServiceRequestSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      // jobApplication(values, locale, callbackUrl)
      //   .then((data) => {
      //     if (data?.error) {
      //       form.reset();
      //       setError(data.error);
      //     }
      //     if (data?.success) {
      //       form.reset();
      //       setSuccess(data.success);
      //     }
      //     if (data?.twoFactor) {
      //       setShowTwoFactor(true);
      //     }
      //   })
      //   .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Request for service"
      subHeaderLabel="Welcome back"
      mainImageUrl="/service/image5.png"
      type="service"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <>
              <FormField
                control={form.control}
                name="requesttitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        placeholder="Infomation Security "
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.requesttitle
                            ? "border border-red-500 focus-visible:ring-0"
                            : "focus-visible:ring-transparent border-none"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="Type Your Reason Here."
                        className={`rounded-[6px]  !min-h-[100px] !max-h-[10vh] bg-[var(--clr-silver-v6)] placeholder:text-left ${
                          form.formState.errors.reason
                            ? "border border-red-500 focus-visible:ring-0"
                            : "focus-visible:ring-transparent border-none"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalNote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="Type Additional Notes Here."
                        className={`rounded-[6px]  !min-h-[100px] !max-h-[10vh] bg-[var(--clr-silver-v6)] placeholder:text-left ${
                          form.formState.errors.additionalNote
                            ? "border border-red-500 focus-visible:ring-0"
                            : "focus-visible:ring-transparent border-none"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>

          <div className="w-full !mb-5 flex justify-center">
            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-[var(--clr-secondary)]"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
