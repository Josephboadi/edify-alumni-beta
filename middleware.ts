import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { i18nRouter } from "next-i18n-router";
import { NextResponse } from "next/server";
import i18nConfig from "./i18nConfig";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const fallbacklanguage = "/";
  const fallbacklanguage1 = "/de";

  let locale = (await req.cookies.get("NEXT_LOCALE")?.value)?.toString();

  let language =
    (await req.cookies.get("NEXT_LOCALE")?.value)?.toString() || "";

  if (!language) {
    language = fallbacklanguage;
  }

  if (language) {
    switch (language) {
      case "de":
        language = fallbacklanguage1;
        break;

      default:
        language = fallbacklanguage;
        break;
    }
  }

  const publicRoutes = [
    `${language}`,
    "/",
    "/en",
    `/auth/new-verification`,
    `${language}/auth/new-verification`,
    `/api/uploadthing`,
    `${language}/api/uploadthing`,
  ];
  const authRoutes = [
    `/auth/login`,
    `/auth/register`,
    `/auth/error`,
    `/auth/reset`,
    `/auth/new-password`,
    `${language}/auth/login`,
    `${language}/auth/register`,
    `${language}/auth/error`,
    `${language}/auth/reset`,
    `${language}/auth/new-password`,
  ];
  const DEFAULT_LOGIN_REDIRECT =
    locale === "en" ? "/profile" : `${language}/profile`;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");

  if (isApiAuthRoute) {
    return i18nRouter(req, i18nConfig);
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl));
      // return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      // return i18nRouter(req, i18nConfig);
    }
    return i18nRouter(req, i18nConfig);
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(
        // `${language}auth/login?callbackUrl=${encodedCallbackUrl}`,
        // `${language}auth/login`,
        `${language}`,
        nextUrl
      )
    );
  }

  return i18nRouter(req, i18nConfig);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
