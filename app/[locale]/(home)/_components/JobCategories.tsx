"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// import { jobCatData } from "@/data/jobcat";
import { cn } from "@/lib/utils";
import { JobCatData } from "@/schemas";
import Autoplay from "embla-carousel-autoplay";
import { Montserrat_Alternates } from "next/font/google";
import Image from "next/image";
import { useRef } from "react";

const font = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

interface JobCatProps {
  jobCatData: JobCatData;
}

const JobCategories = ({ jobCatData }: JobCatProps) => {
  const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));
  return (
    <>
      <div className="w-full">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
          }}
          className="w-full "
        >
          <CarouselContent>
            {jobCatData?.map((cat, index) => (
              <CarouselItem
                key={cat.key}
                className=" basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <Card className="rounded-2xl">
                  {/* <CardContent className="flex  aspect-video items-center justify-center h-[170px] "> */}
                  <div className="relative w-full h-[170px]">
                    <Image src={cat.image} fill alt="-" />
                  </div>
                  {/* </CardContent> */}
                </Card>
                <p className="mt-5 h-2 text-[var(--clr-scarlet-v1)] flex w-full items-center justify-center text-5xl">
                  .
                </p>
                <div className=" text-base mt-3">
                  <p>{cat.title}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
      <CarouselNext /> */}
        </Carousel>

        <div className="w-full flex items-center justify-center ">
          <Button
            variant={"default"}
            size={"lg"}
            className="flex items-center justify-center !py-6 !rounded-full gap-5 mt-10 mb-8  bg-[var(--clr-secondary)] px-10 sm:px-16 "
          >
            <p
              className={cn(
                "text-md text-[var(--clr-primary)] font-semibold  text-center",
                font.className
              )}
            >
              Explore Available Vacancies
            </p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default JobCategories;
