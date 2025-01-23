"use client";

import Wrapper from "@/components/common/Wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// import { herosData } from "@/data/heros";
import { cn } from "@/lib/utils";
import { HeroData } from "@/schemas";
import Autoplay from "embla-carousel-autoplay";
import { Quintessential } from "next/font/google";
import Image from "next/image";
import { useRef } from "react";

// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["600"],
// });

const font = Quintessential({
  subsets: ["latin"],
  weight: ["400"],
});

interface HeroProps {
  herosData: HeroData[];
}
const Hero = ({ herosData }: HeroProps) => {
  const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));
  return (
    <>
      <div className="flex items-center">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          // onMouseEnter={plugin.current.stop}
          // onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {herosData?.map((hero, index) => (
              <CarouselItem key={hero.key}>
                <div className="relative w-full h-[90vh]">
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-[var(--clr-black)] opacity-30 z-10"></div>
                  <Image
                    src={hero.image}
                    fill
                    alt="hero"
                    className="object-cover lg:object-cover bg-no-repeat"
                  />
                  <div className="absolute  left-0 right-0 bottom-32  z-20">
                    <Wrapper>
                      <Card className="w-72 sm:w-80 md:w-96 border-none bg-[var(--clr-tertiary-trans2)] flex flex-col items-start justify-start">
                        <CardHeader>
                          <CardTitle
                            className={cn(
                              "text-3xl text-[var(--clr-primary)] font-semibold text-white drop-shadow-md",
                              font.className
                            )}
                          >
                            {hero.title}
                          </CardTitle>
                          {/* <CardDescription>
                          Deploy your new project in one-click.
                        </CardDescription> */}
                        </CardHeader>
                        <CardContent className=" text-[var(--clr-primary)] flex justify-start text-start font-normal">
                          <p className=" font-light text-sm">
                            {hero.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Wrapper>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

export default Hero;
