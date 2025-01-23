"use client";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// import { sponsorData } from "@/data/sponsors";
import { cn } from "@/lib/utils";
import { SponsorData } from "@/schemas";
import Autoplay from "embla-carousel-autoplay";
import { Aclonica, Aleo } from "next/font/google";
import Image from "next/image";
import { useRef } from "react";

const font = Aleo({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const font1 = Aclonica({
  subsets: ["latin"],
  weight: ["400"],
});

interface SponsorProps {
  sponsorData: SponsorData[];
}
const Sponsors = ({ sponsorData }: SponsorProps) => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <>
      <div className=" w-full flex flex-col md:flex-row px-5 md:items-center py-6 md:py-12 gap-4 md:gap-8">
        <div className="flex flex-row md:flex-col items-end md:items-center">
          <p
            className={cn(
              "text-lg text-[var(--clr-blue)] font-bold mr-2",
              font1.className
            )}
          >
            Our proud
          </p>
          <p className={cn("text-3xl text-[var(--clr-black)]", font.className)}>
            Sponsors
          </p>
        </div>
        <div className="w-full">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent>
              {sponsorData.map((cat, index) => (
                <CarouselItem
                  key={cat.key}
                  className=" basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <Card className=" rounded-none shadow-xl">
                    {/* <CardContent className="flex  aspect-video items-center justify-center h-[170px] "> */}
                    <div className="relative w-full h-[90px] !p-4 flex items-center justify-center">
                      <Image
                        src={cat.image}
                        width={80}
                        height={40}
                        alt="-"
                        className="object-contain object-center w-full h-[60px]"
                      />
                    </div>
                    {/* </CardContent> */}
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious />
      <CarouselNext /> */}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Sponsors;
