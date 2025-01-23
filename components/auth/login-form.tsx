"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { login } from "@/actions/login";
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
import { LoginSchema } from "@/schemas";
import { useAppStore } from "@/store/store";
// import { useSession } from "next-auth/react";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useParams();
  // const session = useSession();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const { setFormType, setAuthModal, setIsAuthenticated } = useAppStore();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      await login(values, locale, callbackUrl)
        .then((data) => {
          // console.log("Data===========================, ", data);
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }

          form.reset();
          setIsAuthenticated();
          setSuccess("Login Sucessful");
          window.location.reload();

          // router.push(locale === "en" ? `/` : `/${locale}/`);

          // setAuthModal(false);

          // if (data?.success) {
          //   console.log(data);
          //   form.reset();
          //   setSuccess(data.success);
          //   setAuthModal(false);
          //   router.push(locale === "en" ? `/` : `/${locale}/`);
          //   router.refresh();
          // }

          // console.log("session============================, ",session);
          // if (token.sub && session.user) {
          // await generateSessionToken(
          //   token.sub,
          //   session.expires,
          //   token.jti as string
          // );
          // }
          // if (data?.success) {
          //   form.reset();
          //   setAuthModal(false);
          // router.push(locale === "en" ? `/` : `/${locale}/`);
          // router.refresh();
          //   setSuccess(data?.success);
          // }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Sign In"
      subHeaderLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref={
        locale === "en" ? `/auth/register` : `/${locale}/auth/register`
      }
      // showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                        className={` bg-[var(--clr-silver-v7)] ${
                          form.formState.errors.code
                            ? "border border-red-500 focus-visible:ring-1"
                            : "focus-visible:ring-transparent border-none"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
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
                          className={` bg-[var(--clr-silver-v7)] ${
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
                      <Button
                        onClick={() => setFormType("")}
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link
                          href={
                            locale === "en"
                              ? `/auth/reset`
                              : `/${locale}/auth/reset`
                          }
                        >
                          Forgot password?
                        </Link>
                      </Button>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-[var(--clr-secondary)]"
          >
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
