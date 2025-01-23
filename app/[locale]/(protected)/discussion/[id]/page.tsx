import initTranslations from "@/app/i18n";
import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import { singleTopic } from "@/lib/discussion";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { Suspense } from "react";
import SingleDiscussion from "../../_components/SingleDiscussion";

const font1 = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const i18nNamespace = ["navbar", "footer", "discussion"];

const EventDetail = async ({ params: { locale, id } }: any) => {
  const { t, resources } = await initTranslations(locale, i18nNamespace);

  const { discussionData } = await singleTopic(id);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespace}
    >
      <Navbar locale={locale} />
      <div className="w-full h-full overflow-y-auto flex flex-col bg-[var(--clr-silver)]">
        <section className=" w-full mt-28 xs:mt-32  pb-5">
          <Wrapper>
            <div className="w-full flex items-center justify-center ">
              <div className="w-max h-8 relative mt-4 sm:mt-2 sm:mb-5">
                <h1
                  className={cn(
                    "text-2xl xs:text-3xl -mt-[38px] xs:-mt-[46px] mb-6 text-[var(--clr-black)] font-bold text-center",
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
        <section className=" w-full">
          <Wrapper>
            <div className="md:px-10 xl:px-14">
              <h1 className=" mx-2 text-xl font-bold mb-2 text-left text-[var(--clr-black-light)]">
                Thread
              </h1>
            </div>
          </Wrapper>
        </section>

        <Suspense fallback={"Loading..."}>
          <SingleDiscussion discussionData={discussionData!} />
        </Suspense>

        {/* <section className="bg-[var(--clr-secondary)] w-full">
          <Wrapper></Wrapper>
        </section> */}
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </TranslationsProvider>
  );
};

export default EventDetail;
