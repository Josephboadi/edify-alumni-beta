// import Navbar from "./_components/navbar";
// import dynamic from "next/dynamic";
// const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
//   ssr: false,
// });
import { ReactNode } from "react";

// const i18nNamespace = ["navbar", "footer"];
interface ProtectedLayoutProps {
  children: ReactNode;
  params: any;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  // const { t, resources } = await initTranslations(locale, i18nNamespace);
  return (
    // <TranslationsProvider
    //   resources={resources}
    //   locale={locale}
    //   namespaces={i18nNamespace}
    // >
    // {/* max-h-screen */}
    <main className="flex flex-col min-h-screen min-w-full ">
      {/* <Navbar locale={locale} /> */}
      {/* <div className="flex w-full">{children}</div> */}
      {/* <div className="w-full">
          <Footer />
        </div> */}
      {children}
    </main>
    // </TranslationsProvider>
  );
};

export default ProtectedLayout;
