"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BriefNewsData } from "@/schemas";
import { useAppStore } from "@/store/store";
// import { newsData } from "@/data/briefnews";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";
import { NewsPreviewButton } from "./NewsPreviewButton";

interface BriefNewsProps {
  newsData: BriefNewsData[];
}

const BriefNews = ({ newsData }: BriefNewsProps) => {
  const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));
  const plugin1 = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  const { setNewsInfoData } = useAppStore();
  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full"
      >
        <CarouselContent className=" h-[1162px] sm:h-[596px]">
          {newsData?.map((news) => (
            <CarouselItem key={news.key} className=" basis-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-9 lg:grid-cols-7 xl:grid-cols-6 w-full sm:h-[274px]">
                <div className=" col-span-1 sm:col-span-4 lg:col-span-3 xl:col-span-2 relative h-[274px] bg-[var(--clr-primary-light)] ">
                  <Carousel plugins={[plugin1.current]} className="w-full ">
                    <CarouselContent>
                      {news?.images?.map((img, index) => {
                        return (
                          <CarouselItem key={index}>
                            <div className="w-full h-[274px] relative">
                              <Image
                                src={img}
                                fill
                                alt="Image"
                                className=" object-cover"
                              />
                            </div>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <CarouselPrevious className=" ml-14" />
                    <CarouselNext className=" mr-14" />
                  </Carousel>
                </div>
                <div className=" col-span-1 sm:col-span-5 lg:col-span-4 xl:col-span-4  h-[274px] p-5 pt-5 sm:pt-0">
                  <div className="w-full h-full flex flex-col justify-between gap-4">
                    <div className="flex w-full flex-col gap-4">
                      <h1 className="text-xl font-bold text-left">
                        {news?.title}
                      </h1>
                      <p className=" text-left line-clamp-6">
                        {news?.description}
                      </p>
                    </div>

                    <div className="flex justify-end pr-4">
                      <NewsPreviewButton asChild>
                        <Button
                          onClick={() => setNewsInfoData(news)}
                          variant={"outline"}
                          className="text-sm font-normal h-[32px]"
                        >
                          View Details
                        </Button>
                      </NewsPreviewButton>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
      <CarouselNext /> */}
      </Carousel>
    </>
  );
};

export default BriefNews;
