"use client";
import { changelanguage } from "@/actions/change-language";
import i18nConfig from "@/i18nConfig";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

// interface LanguageButtonProps {
//   children: React.ReactNode;
//   language?: string;
//   asChild?: boolean;
// }

export const LanguageButton = ({
  children,
  language = "en",
  // locale,
  asChild,
}) => {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const router = useRouter();
  const pathname = usePathname();
  const newpath = pathname.slice(3);

  // const days = 30;
  // const date = new Date();
  // date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  // const expire = "; expires=" + date.toUTCString();
  // document.cookie = `NEXT_LOCALE=${language};expires=${expire};path=/`;
  // cookieCutter.set("lang", language);

  const onClick = async () => {
    // cookies().set("lang", language);
    await changelanguage(language, locale);
    // router.push(`/${language}${newpath}`);
    // // router.push(`/${language}/settings`);

    if (locale === i18nConfig.defaultLocale) {
      router.push("/" + language + pathname);
    } else {
      router.push(pathname.replace(`/${locale}`, `/${language}`));
    }
    router.refresh();
  };

  // if (mode === "modal") {
  //   return (
  //     <Dialog>
  //       <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
  //       <DialogContent className="p-0 w-auto bg-transparent border-none">
  //         <LoginForm />
  //       </DialogContent>
  //     </Dialog>
  //   );
  // }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
