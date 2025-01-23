import initTranslations from "@/app/i18n";
import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import { eventList } from "@/lib/event";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { Suspense } from "react";
import EventList from "../_components/EventList";

const font1 = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const i18nNamespace = ["navbar", "footer", "event"];
const EventPage = async ({ searchParams, params: { locale } }: any) => {
  const page = searchParams?.page || 1;
  const { pageCount, eventsData } = await eventList(page);

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
              <div className="w-max h-8 relative  sm:mt-2 sm:mb-5">
                <h1
                  className={cn(
                    "text-2xl xs:text-3xl -mt-[42px] sm:-mt-[42px] mb-6 text-[var(--clr-black)] font-bold drop-shadow-md text-center",
                    font1.className
                  )}
                >
                  Event Center
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

        <section className=" w-full  pb-5">
          <Wrapper>
            <div className="md:px-10 xl:px-14 w-full">
              <div>
                <h1 className="text-xl font-bold mb-2 text-center">
                  Live Event
                </h1>
              </div>
              <Suspense fallback={"Loading..."}>
                <EventList pageCount={pageCount} eventsData={eventsData} />
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

export default EventPage;
