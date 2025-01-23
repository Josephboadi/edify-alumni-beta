// import dynamic from "next/dynamic";
// const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
//   ssr: false,
// });
// import { usePathname } from "next/navigation";

import { ReactNode } from "react";

// const i18nNamespace = ["navbar", "footer"];
async function Layout({ children }: { children: ReactNode }) {
  // const { locale } = params;
  // const { t, resources } = await initTranslations(locale, i18nNamespace);
  // const pathname = usePathname();
  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nNamespace}
    // >
    // {/* max-h-screen */}
    <main className="flex flex-col min-h-screen min-w-full  ">
      {/* <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          <UserButton />
        </div>
      </nav> */}
      {/* <Navbar locale={locale} /> */}
      {/* <div className="flex w-full flex-grow">{children}</div> */}
      {/* <div className="w-full">
          <Footer />
        </div> */}
      {children}
    </main>
    // </TranslationsProvider>
  );
}

export default Layout;
