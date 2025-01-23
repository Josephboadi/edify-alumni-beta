import initTranslations from "@/app/i18n";
import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import { discussionList } from "@/lib/discussion";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { Suspense } from "react";
import DiscussionList from "../_components/DiscussionList";
import Search from "../_components/Search";

const font1 = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const i18nNamespace = ["navbar", "footer", "discussion"];
const DiscussionPage = async ({ searchParams, params: { locale } }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { pageCount, discussionsData } = await discussionList(q, page);

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
        <section className=" w-full  mt-32  pb-5">
          <Wrapper>
            <div className="w-full flex items-center justify-center ">
              <div className="w-max h-8 relative sm:mt-2 mb-5">
                <h1
                  className={cn(
                    "text-2xl xs:text-3xl -mt-[38px] xs:-mt-[42px] sm:-mt-[42px] mb-6 text-[var(--clr-black)] font-bold drop-shadow-md text-center",
                    font1.className
                  )}
                >
                  Discussion Board
                </h1>
                <Image
                  src={"/event/underline.png"}
                  fill
                  alt="-"
                  className="bg-[var(--clr-silver)]"
                />
              </div>
            </div>
          </Wrapper>
        </section>

        <section className=" bg-[var(--clr-secondary)] w-full  ">
          <Wrapper>
            <div className="md:px-10 xl:px-14 flex sm:items-center sm:justify-between py-4 gap-5 flex-col sm:flex-row">
              <div className="space-y-[2px]">
                <p className="text-[var(--clr-primary)]">
                  Comment on topics here, share ideas
                </p>
                <p className="text-[var(--clr-primary)]">
                  & become an Active Community
                </p>
                <p className="text-[var(--clr-primary)]">Member</p>
              </div>
              <div className="w-full sm:w-max flex items-center justify-end">
                <div className=" w-[280px] ">
                  <Search placeholder="Search a topic or hashtag..." />
                </div>
              </div>
            </div>
          </Wrapper>
        </section>

        <section className=" w-full  pb-5 mt-10">
          <Wrapper>
            <div className="md:px-10 xl:px-14 w-full">
              <div>
                <h1 className="text-xl font-bold mb-2 text-left">Recent</h1>
              </div>

              <Suspense fallback={"Loading..."}>
                <DiscussionList
                  pageCount={pageCount}
                  discussionsData={discussionsData}
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

export default DiscussionPage;
