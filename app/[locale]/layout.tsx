import { auth } from "@/auth";
// import { Toaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
// import { unstable_setRequestLocale } from "next-intl/server";
import DesignerContextProvider from "@/components/context/DesignerContext";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// Can be imported from a shared config
// const locales = ["en", "de"];

// export function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { locale } = params;
  const session = await auth();
  // unstable_setRequestLocale(locale);
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css"
          integrity="sha512-Oy+sz5W86PK0ZIkawrG0iv7XwWhYecM3exvUtMKNJMekGFJtVAhibhRPTpmyTj8+lJCkmWfnpxKgT2OopquBHA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <style></style>
      </head>
      <SessionProvider session={session}>
        {/* <NextTopLoader color={"var(--clr-secondary)"} showSpinner={false} /> */}
        <body className={inter.className} suppressHydrationWarning={true}>
          <NextTopLoader
            color={"var(--clr-secondary-light)"}
            showSpinner={false}
          />
          <DesignerContextProvider>
            {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
            {children}
            <Toaster />
            {/* </ThemeProvider> */}
          </DesignerContextProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
