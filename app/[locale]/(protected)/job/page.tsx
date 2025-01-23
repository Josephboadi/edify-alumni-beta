// import { auth } from "@/auth";
import initTranslations from "@/app/i18n";
import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import { jobList } from "@/lib/job";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { Suspense } from "react";
import Head from "../_components/Head";
import JobList from "../_components/JobList";
import Search from "../_components/Search";

const font1 = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const i18nNamespace = ["navbar", "footer", "job"];
const JobPage = async ({ searchParams, params: { locale } }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { pageCount, jobsData } = await jobList(q, page);

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
        <Head>
          <Image
            src={"/job/head.png"}
            fill
            alt="-"
            className=" object-cover bg-no-repeat"
          />
          <div className=" absolute top-0 left-0 right-0 bottom-0 ">
            <Wrapper>
              <div className="h-full w-full flex items-end justify-end pb-8 ">
                <div className=" w-[280px] ">
                  <Search placeholder="Search..." />
                </div>
              </div>
            </Wrapper>
          </div>
        </Head>

        <section className=" w-full !mb-6 mt-20  pb-5">
          <Wrapper>
            <div className="w-full flex items-center justify-center ">
              <div className="w-max h-8 relative mt-4 sm:mt-2 sm:mb-5">
                <h1
                  className={cn(
                    "text-2xl xs:text-3xl -mt-[68px] xs:-mt-[72px] sm:-mt-[42px] mb-6 text-[var(--clr-black)] font-bold drop-shadow-md text-center",
                    font1.className
                  )}
                >
                  Welcome to Our Job Center
                </h1>
                <Image
                  src={"/job/underline.png"}
                  fill
                  alt="-"
                  className="bg-[var(--clr-silver)]"
                />
              </div>
            </div>
          </Wrapper>
        </section>

        <section className=" w-full !mb-5  pb-5">
          <Wrapper>
            <div className="md:px-10 xl:px-14 w-full">
              <div>
                <p className="font-semibold mb-2">
                  Apply for a wide range of jobs
                </p>
              </div>

              <Suspense fallback={"Loading..."}>
                <JobList pageCount={pageCount} jobsData={jobsData} />
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

export default JobPage;
