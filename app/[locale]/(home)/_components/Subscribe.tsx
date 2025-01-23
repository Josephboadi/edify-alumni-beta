"use client";

import { subscribe } from "@/actions/subscribe";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { SubscribeSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import * as z from "zod";

const font = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});
const Subscribe = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SubscribeSchema>>({
    resolver: zodResolver(SubscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SubscribeSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      subscribe(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        form.reset();
      });
    });
  };

  useEffect(() => {
    if (error) {
      toast({ description: error });
    }
    if (success) {
      toast({ description: success });
    }

    return;
  }, [error, success]);

  return (
    <>
      <div className=" w-full md:w-[90%] lg:w-[80%] xl:w-[70%] sm:h-[175px] bg-[var(--clr-secondary-light)] flex flex-col gap-5 pb-5">
        <div className="px-5 md:px-7 lg:px-9 xl:px-11 grid grid-cols-1 sm:grid-cols-2 sm:h-[80px] gap-2 sm:gap-0 ">
          <div className="flex  h-[80px] items-end justify-center  px-5 pr-8 w-full">
            <div className="flex w-max flex-col h-[80px] items-start justify-end ">
              <h1
                className={cn(
                  "text-2xl text-[var(--clr-primary)] font-extrabold text-left",
                  font.className
                )}
              >
                Don’t Miss Out{" "}
              </h1>
              <p
                className={cn(
                  "text-sm text-[var(--clr-primary)] font-semibold  text-left",
                  font.className
                )}
              >
                On Our Latest Updates
              </p>
            </div>
          </div>
          <div className="w-full h-[80px] relative  ">
            <Image
              src={"/service/subscribe.png"}
              fill
              alt="-"
              className="z-10"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[var(--clr-tertiary-trans2)]" />
          </div>
        </div>

        <div className="w-full  flex items-center  justify-center mt-1">
          <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-9 lg:grid-cols-10 gap-2 w-full"
              >
                <div className="w-full col-span-6 md:col-span-6 lg:col-span-7 ">
                  <div className="space-y-1">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Email</FormLabel> */}
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Please Enter Your Email Here."
                              type="email"
                              className={`h-[45px]   bg-[var(--clr-silver-v2)] placeholder:text-center ${
                                form.formState.errors.email
                                  ? "border border-red-500 focus-visible:ring-0"
                                  : "focus-visible:ring-transparent border-none"
                              }`}
                            />
                          </FormControl>
                          {/* <FormMessage className="text-left pl-1 italic" /> */}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full col-span-3 md:col-span-3 lg:col-span-3 h-[45px]">
                  <Button
                    disabled={isPending}
                    //   type="submit"
                    className="w-full h-full italic bg-[var(--clr-pumpkin)] text-[var(--clr-black)] font-bold"
                  >
                    Subscribe
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
