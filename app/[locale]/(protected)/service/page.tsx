import { GetForms } from "@/actions/form";
import initTranslations from "@/app/i18n";
import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Montez, Montserrat, Russo_One } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";
import { CgUnavailable } from "react-icons/cg";
import { FaWpforms } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { MdOutlineSend } from "react-icons/md";

const font = Montez({
  subsets: ["latin"],
  weight: ["400"],
});

const font1 = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const font11 = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
});

const i18nNamespace = ["navbar", "footer", "service"];
const ServicePage = async ({ searchParams, params: { locale } }: any) => {
  const q = searchParams?.q || "";
  const forms = await GetForms();
  // console.log(forms);

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
        <section className=" w-full mt-32">
          <Wrapper>
            <div className="w-full md:divide-x md:divide-[var(--clr-black)] grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 px-4 sm:px-8 md:px-4 lg:px-14 xl:px-20 ">
              <div className="w-max relative mt-2 sm:mt-2 sm:mb-0 md:col-span-3 lg:col-span-2 flex flex-col gap-3">
                <h1
                  className={cn(
                    "!text-6xl text-md mb-1 text-[var(--clr-black)] font-semibold ",
                    font.className
                  )}
                >
                  Welcome to our
                </h1>
                <h1
                  className={cn(
                    "text-6xl text-[var(--clr-pumpkin)] font-bold ",
                    font11.className
                  )}
                >
                  Services
                </h1>

                <h1
                  className={cn(
                    "text-6xl text-[var(--clr-pumpkin)] font-bold ",
                    font11.className
                  )}
                >
                  Center
                </h1>
              </div>

              <div className="  md:pl-16 lg:pl-20 md:col-span-3 flex flex-col gap-6 md:py-4 mt-9 md:mt-0">
                <p className=" text-xl font-semibold">
                  This center provides insightful and thoughtful support to all
                  Alumni’s in need of emotional, psychological and mental
                  support.
                </p>
                <p className=" text-xl font-semibold">
                  Please feel free to place a request by selecting one of the
                  available options below.
                </p>
              </div>
            </div>
          </Wrapper>
        </section>

        <section className=" w-full md:mt-8 !mb-10  pb-5">
          <Wrapper>
            {/* <div className=" px-4 sm:px-8 md:px-4 lg:px-14 xl:px-20 mt-20 flex w-full items-center justify-center gap-6 sm:gap-12">
              <ServiceRequestButton asChild>
                <div className="flex flex-col items-center transition-all duration-300 hover:scale-95 cursor-pointer">
                  <div className="w-[65px] h-[65px] sm:w-[70px] sm:h-[70px] relative rounded-full border-[3px] border-[var(--clr-green)] !p-2">
                    <Image
                      src={"/service/image3.png"}
                      width={100}
                      height={100}
                      alt="-"
                      className=" object-cover rounded-full object-center  "
                    />
                  </div>
                  <p className=" -mt-6 text-[var(--clr-secondary)] flex w-full items-center justify-center text-5xl">
                    .
                  </p>
                  <p className=" text-center">Emotional</p>
                </div>
              </ServiceRequestButton>

              <ServiceRequestButton asChild>
                <div className="flex flex-col items-center transition-all duration-300 hover:scale-95 cursor-pointer">
                  <div className="w-[65px] h-[65px] sm:w-[70px] sm:h-[70px] relative rounded-full border-[3px] border-[var(--clr-green)] !p-2">
                    <Image
                      src={"/service/image4.png"}
                      width={100}
                      height={100}
                      alt="-"
                      className="object-cover rounded-full object-center "
                    />
                  </div>
                  <p className=" -mt-6 text-[var(--clr-secondary)] flex w-full items-center justify-center text-5xl">
                    .
                  </p>
                  <p className=" text-center">Psychological</p>
                </div>
              </ServiceRequestButton>

              <ServiceRequestButton asChild>
                <div className="flex flex-col items-center transition-all duration-300 hover:scale-95 cursor-pointer">
                  <div className="w-[65px] h-[65px] sm:w-[70px] sm:h-[70px] relative rounded-full border-[3px] border-[var(--clr-green)] !p-2">
                    <Image
                      src={"/service/image5.png"}
                      width={100}
                      height={100}
                      alt="-"
                      className="object-cover rounded-full object-center "
                    />
                  </div>
                  <p className=" -mt-6 text-[var(--clr-secondary)] flex w-full items-center justify-center text-5xl">
                    .
                  </p>
                  <p className=" text-center">Mental</p>
                </div>
              </ServiceRequestButton>
            </div> */}

            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              )}
            >
              <Suspense
                fallback={[1, 2, 3, 4].map((el) => (
                  <FormCardSkeleton key={el} />
                ))}
              >
                <FormCards />
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

export default ServicePage;

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms?.length < 1 ? (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center h-[20vh] ">
          <CgUnavailable className="text-4xl w-24 h-24" />
          <p className="text-center">No service available.</p>
        </div>
      ) : (
        forms.map((form: Form) => <FormCard key={form.id} form={form} />)
      )}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/service/${form.shareURL}`}>
              Subscribe <MdOutlineSend />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
