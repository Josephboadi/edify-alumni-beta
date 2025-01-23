import { auth } from "@/auth";
// import { useTranslations } from "next-intl";
// import { unsta ble_setRequestLocale } from "next-intl/server";
import { Montserrat, Righteous } from "next/font/google";
import { Suspense } from "react";

// import { createRoleMenu, getAllNestedRoleMenus } from "@/actions/role-menu";
import initTranslations from "@/app/i18n";
// import { useEffect } from "react";
import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/Wrapper";
// import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { about } from "@/lib/about";
import { alumni } from "@/lib/alumni";
import { heroes } from "@/lib/hero";
import { jobCategories } from "@/lib/jobcat";
import { news } from "@/lib/news";
import { sponsor } from "@/lib/sponsor";
import { cn } from "@/lib/utils";
import Image from "next/image";
import TranslationsProvider from "./../../../components/providers/TranslationsProvider";
import About from "./_components/About";
import BriefNews from "./_components/BriefNews";
import Hero from "./_components/Hero";
import JobCategories from "./_components/JobCategories";
import Service from "./_components/Service";
import Sponsors from "./_components/Sponsors";
import Subscribe from "./_components/Subscribe";
import TopAlumi from "./_components/TopAlumi";
import Navbar from "./_components/navbar/Navbar";

// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["600"],
// });

const font = Righteous({
  subsets: ["latin"],
  weight: ["400"],
});

const font1 = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const i18nNamespace = ["navbar", "footer", "home"];

async function getHerosData() {
  const herosData = await heroes();
  return herosData;
}
async function getAboutData() {
  const aboutData = await about();
  return aboutData;
}
async function getBreiefNewsData() {
  const newsData = await news();
  return newsData;
}
async function getJobCatData() {
  const jobCatData = await jobCategories();
  return jobCatData;
}
async function getSponsorData() {
  const sponsorData = await sponsor();
  return sponsorData;
}
async function getTopAlumniData() {
  const alumniData = await alumni();
  return alumniData;
}
export default async function Home({ params: { locale } }: any) {
  const { t, resources } = await initTranslations(locale, i18nNamespace);
  const session = await auth();
  // const authData = await auth();
  // console.log("AUTH DATA================================, ", authData);
  //  const herosData = await heroes();
  //   const aboutData = await about();
  //   const newsData = await news();
  //   const jobCatData = await jobCategories();
  //   const sponsorData = await sponsor();
  //   const alumniData = await alumni();

  const getHeros = getHerosData();
  const getAbout = getAboutData();
  const getNews = getBreiefNewsData();
  const getJobCat = getJobCatData();
  const getSponsor = getSponsorData();
  const getTopAlumni = getTopAlumniData();
  const [herosData, aboutData, newsData, jobCatData, sponsorData, alumniData] =
    await Promise.all([
      getHeros,
      getAbout,
      getNews,
      getJobCat,
      getSponsor,
      getTopAlumni,
    ]);

  // if (authData) {
  //   generateSessionToken(
  //     authData?.user?.id,
  //     authData?.expires,
  //     authData?.user?.token
  //   );
  // }
  // console.log(herosData);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespace}
    >
      {/* //{" "} */}
      {/* <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"> */}
      <Navbar locale={locale} />
      <div className="space-y-2 text-center w-full overflow-y-auto">
        <section className="h-[90vh] w-full overflow-hidden mb-4">
          <Suspense fallback={<p>Loading...</p>}>
            <Hero herosData={herosData!} />
          </Suspense>
        </section>
        <section className=" w-full !mb-6 mt-4">
          <Wrapper>
            <div className="w-full flex items-center justify-start">
              <h1
                className={cn(
                  "text-3xl mt-2 mb-4 text-[var(--clr-black)] font-bold drop-shadow-md",
                  font.className
                )}
              >
                Brief News
              </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <div className="flex flex-grow  h-full">
                <div className="flex flex-col items-center w-full">
                  <Suspense fallback={<p>Loading...</p>}>
                    <BriefNews newsData={newsData!} />
                  </Suspense>
                </div>
              </div>
              <div className="flex w-full lg:w-[1200px] xl:w-[984px] flex-col py-5 sm:flex-row lg:flex-col gap-7   lg:h-full mb-5 items-start">
                <div className="w-full items-center flex flex-col space-y-2">
                  <div className="h-28 bg-[var(--clr-secondary)] w-40 rounded-full flex flex-col items-center">
                    <p className="text-sm font-normal text-[var(--clr-primary)] items-start mt-1">
                      2000
                    </p>
                    <div className=" w-20 h-20 relative">
                      <Image src={"/news/people.png"} fill alt="peaople" />
                    </div>
                  </div>
                  <div className="h-[1px] bg-[var(--clr-green)] w-full mt-2" />

                  <p className="text-sm font-semibold">
                    Over 2,000 registered school Alumni
                  </p>
                </div>

                <div className="w-full items-center flex flex-col space-y-2">
                  <div className="h-28 bg-[var(--clr-secondary)] w-40 rounded-full flex items-center justify-center">
                    <div className=" w-20 h-20 relative">
                      <Image src={"/news/event.png"} fill alt="peaople" />
                    </div>
                  </div>
                  <div className="h-[1px] bg-[var(--clr-green)] w-full mt-2" />

                  <p className="text-sm font-semibold">
                    Available Event Center
                  </p>
                </div>

                <div className="w-full items-center flex flex-col space-y-2">
                  <div className="h-28 bg-[var(--clr-secondary)] w-40 rounded-full flex items-center justify-center">
                    <div className=" w-20 h-20 relative">
                      <Image src={"/news/chat.png"} fill alt="peaople" />
                    </div>
                  </div>
                  <div className="h-[1px] bg-[var(--clr-green)] w-full mt-2" />

                  <p className="text-sm font-semibold">
                    Online Discussion Board
                  </p>
                </div>
              </div>
            </div>
          </Wrapper>
        </section>

        <section className=" w-full !mb-10 bg-[var(--clr-peach)] pb-5">
          <Wrapper>
            <div className="w-full flex items-center justify-center ">
              <h1
                className={cn(
                  "text-3xl mt-5 mb-6 text-[var(--clr-black)] font-bold drop-shadow-md text-center",
                  font1.className
                )}
              >
                Celebrating Our Alumni
              </h1>
            </div>
            <div className="flex w-full h-full">
              <div className="flex  items-center w-full ">
                <Suspense fallback={<p>Loading...</p>}>
                  <TopAlumi alumniData={alumniData!} />
                </Suspense>
              </div>
            </div>
          </Wrapper>
        </section>

        <section className=" w-full !mb-14 ">
          <Wrapper>
            <div className="w-full flex  items-center ">
              <div className="w-[160px] h-8 relative mt-12 mb-5">
                <h1
                  className={cn(
                    "text-3xl ml-4 -mt-[22px] mb-6 text-[var(--clr-black)] font-bold drop-shadow-md text-left",
                    font.className
                  )}
                >
                  About Us
                </h1>
                <Image src={"/underline.png"} fill alt="-" />
              </div>
            </div>

            <Suspense fallback={<p>Loading...</p>}>
              <About aboutData={aboutData!} />
            </Suspense>
          </Wrapper>
        </section>

        <section className=" w-full !mb-10 bg-[var(--clr-silver)]">
          <Wrapper>
            <div className="flex items-center justify-end  ">
              <Button
                variant={"outline"}
                size={"default"}
                className="flex items-center !py-6 !rounded-[10px] gap-5 mt-6 bg-transparent border-2 border-[var(--clr-black)] "
              >
                <h1
                  className={cn(
                    "text-2xl mt-5 mb-6 text-[var(--clr-black)] font-bold drop-shadow-md text-left",
                    font1.className
                  )}
                >
                  Job Eye
                </h1>
                <div className="w-9 h-9 relative">
                  <Image src={"/joblogo.png"} fill alt="-" />
                </div>
              </Button>
            </div>

            <div>
              <p
                className={cn(
                  "text-lg  font-normal  text-left ml-1",
                  font1.className
                )}
              >
                Apply for various job Categories
              </p>
              <div className=" mt-1 border-t-[1px] w-full border-[var(--clr-black)]" />
            </div>

            <div className="mt-3">
              <Suspense fallback={<p>Loading...</p>}>
                <JobCategories jobCatData={jobCatData!} />
              </Suspense>
            </div>
          </Wrapper>
        </section>

        <section className=" w-full !mb-2 bg-[var(--clr-primary)]">
          <Wrapper>
            <div className="border-t-2 border-[var(--clr-black)] w-full mb-4" />
            <div className="w-full flex items-center justify-center ">
              <h1
                className={cn(
                  "text-3xl  mb-5 text-[var(--clr-black)] font-bold drop-shadow-md text-center",
                  font1.className
                )}
              >
                Services Center
              </h1>
            </div>
            <div className="w-full">
              <Suspense fallback={"Loading..."}>
                <Service />
              </Suspense>
            </div>
            <div className="border-t-2 mt-3 border-[var(--clr-black)] w-full" />

            {/* <div className="w-full flex items-center justify-center">
              <Subscribe />
            </div> */}
          </Wrapper>
        </section>

        <section className=" w-full !mb-2 bg-[var(--clr-silver)] py-6">
          <Wrapper>
            <div className="w-full bg-[var(--clr-primary-light)]">
              <Suspense fallback={<p>Loading...</p>}>
                <Sponsors sponsorData={sponsorData!} />
              </Suspense>
            </div>
          </Wrapper>
        </section>

        <section className=" w-full !mb-4 ">
          <Wrapper>
            <div className="w-full flex items-center justify-center">
              <Suspense fallback={"Loading..."}>
                <Subscribe />
              </Suspense>
            </div>
          </Wrapper>
        </section>

        {/* <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          {t("title")}
        </h1> */}
      </div>
      <div className="w-full">
        <Footer />
      </div>
      {/* //{" "} */}
      {/* </main> */}
    </TranslationsProvider>
  );
}
