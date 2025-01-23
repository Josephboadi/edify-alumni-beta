import initTranslations from "@/app/i18n";
import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import { singleEvent } from "@/lib/event";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { Suspense } from "react";
import SingleEvent from "../../_components/SingleEvent";

const font1 = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const i18nNamespace = ["navbar", "footer", "event"];

const EventDetail = async ({ params: { locale, id } }: any) => {
  const { t, resources } = await initTranslations(locale, i18nNamespace);
  const { eventData } = await singleEvent(id);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespace}
    >
      <Navbar locale={locale} />
      <div className="w-full h-full overflow-y-auto flex flex-col bg-[var(--clr-silver)]">
        <section className=" w-full mb-2 xs:!mb-6 mt-28 xs:mt-32  pb-5">
          <Wrapper>
            <div className="w-full flex items-center justify-center ">
              <div className="w-max h-8 relative mt-4 sm:mt-2 sm:mb-5">
                <h1
                  className={cn(
                    "text-2xl xs:text-3xl -mt-[42px] xs:-mt-[72px] sm:-mt-[44px] mb-6 text-[var(--clr-black)] font-bold drop-shadow-md text-center",
                    font1.className
                  )}
                >
                  Event Detail / Booking
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

        <section className="w-full !mb-5  pb-5">
          <Wrapper>
            <Suspense fallback={"Loading..."}>
              <SingleEvent eventData={eventData!} />
            </Suspense>
          </Wrapper>
        </section>
      </div>
      <div className="w-full">
          <Footer />
        </div>
    </TranslationsProvider>
  );
};

export default EventDetail;
