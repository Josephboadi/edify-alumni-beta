import initTranslations from "@/app/i18n";
import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import { scholarShipList } from "@/lib/scholarship";
import { cn } from "@/lib/utils";
import { Montserrat, Montserrat_Alternates, Russo_One } from "next/font/google";
import { Suspense } from "react";
import ScholarshipList from "../_components/SchorlarshipList";
import Search from "../_components/Search";

const font = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const font1 = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const font11 = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
});

const i18nNamespace = ["navbar", "footer", "scholarship"];
const ScholarshipPage = async ({ searchParams, params: { locale } }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { pageCount, scholarshipsData } = await scholarShipList(q, page);

  // const searchq = new RegExp(q, "i");

  const { t, resources } = await initTranslations(locale, i18nNamespace);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespace}
    >
      <Navbar locale={locale} />
      <div className="w-full h-full overflow-y-auto flex flex-col bg-[var(--clr-silver)]">
        <section className=" w-full mt-20">
          <Wrapper>
            <div className="w-full flex items-center ">
              <div className="w-max relative mt-2 sm:mt-2 sm:mb-0">
                <p
                  className={cn(
                    "text-md mb-1 text-[var(--clr-black)] font-semibold ",
                    font.className
                  )}
                >
                  Available
                </p>
                <h1
                  className={cn(
                    "text-3xl text-[var(--clr-pumpkin)] font-bold ",
                    font11.className
                  )}
                >
                  Scholarships
                </h1>
              </div>
            </div>
          </Wrapper>
        </section>
        <section className=" w-full mt-1">
          <Wrapper>
            <div className="w-full flex items-center justify-end">
              <div className=" w-[280px] ">
                <Search placeholder="Search..." />
              </div>
            </div>
          </Wrapper>
        </section>
        <section className=" w-full mt-4 !mb-5  pb-5">
          <Wrapper>
            <div className="px-4  w-full bg-[var(--clr-primary)] py-4 rounded-[10px]">
              <Suspense fallback={"Loading..."}>
                <ScholarshipList
                  pageCount={pageCount}
                  scholarshipsData={scholarshipsData}
                />
              </Suspense>
            </div>
          </Wrapper>
        </section>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </TranslationsProvider>
  );
};

export default ScholarshipPage;
