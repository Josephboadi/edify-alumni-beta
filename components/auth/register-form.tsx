"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { register } from "@/actions/register";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
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
import { RegisterSchema } from "@/schemas";
import { useAppStore } from "@/store/store";
import { useParams } from "next/navigation";
import DropdownCountry from "../common/DropdownCountry";
import DropdownSchool from "../common/DropdownSchool";
import DropdownYear from "../common/DropdownYear";

export const RegisterForm = () => {
  const { locale } = useParams();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { setAuthModal } = useAppStore();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      password: "",
      name: "",
      country: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values, locale).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        // if (data.success) {
        //   setAuthModal();
        // }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref={locale === "en" ? `/auth/login` : `/${locale}/auth/login`}
      // showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John Doe"
                      className={` bg-[var(--clr-silver-v6)] ${
                        form.formState.errors.name
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                      className={` bg-[var(--clr-silver-v6)] ${
                        form.formState.errors.email
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PhoneNumber</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))} // Convert value to number
                      disabled={isPending}
                      placeholder="eg. 0544789544"
                      className={` bg-[var(--clr-silver-v6)] ${
                        form.formState.errors.phoneNumber
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
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select Country</FormLabel>
                  <FormControl>
                    <DropdownCountry
                      onChangeHandler={field.onChange}
                      value={field.value}
                      isError={form.formState.errors.country ? true : false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select Your School</FormLabel>
                  <FormControl>
                    <DropdownSchool
                      onChangeHandler={field.onChange}
                      value={field.value}
                      isError={form.formState.errors.school ? true : false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select Year of Completion</FormLabel>
                  <FormControl>
                    <DropdownYear
                      onChangeHandler={field.onChange}
                      value={field.value}
                      isError={form.formState.errors.year ? true : false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                      className={` bg-[var(--clr-silver-v6)] ${
                        form.formState.errors.password
                          ? "border border-red-500 focus-visible:ring-0"
                          : "focus-visible:ring-transparent border-none"
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-[var(--clr-secondary)] !mt-10"
          >
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
