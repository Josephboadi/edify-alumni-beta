import { Header } from "@/components/auth/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppStore } from "@/store/store";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";

const NewsPreview = () => {
  const plugin1 = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  const { newsInfoData }: any = useAppStore();
  console.log(newsInfoData);
  return (
    <div className="flex w-[320px] xs:w-[360px] sm:w-[400px] md:w-[700px]  border-none min-h-[520px] !rounded-xl">
      <Card className="w-full rounded-none h-full max-h-[76vh] md:max-h-[96vh] overflow-y-auto no-scrollbar flex flex-col justify-between bg-[var(--clr-primary)] relative">
        <CardHeader className="!bg-[var(--clr-primary)] sticky top-0 left-0 right-0 z-[1]">
          <Header label={"News & Information"} />
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:px-6">
            <div className=" col-span-1 w-full relative h-[300px] sm:h-[400px]  md:h-[500px] ">
              <Carousel plugins={[plugin1.current]} className="w-full ">
                <CarouselContent>
                  {newsInfoData?.images.map((img: any, index: any) => {
                    return (
                      <CarouselItem key={index}>
                        <div className="w-full h-[300px] sm:h-[400px]  md:h-[500px] relative">
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
            <div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold text-left line-clamp-1">
                  {newsInfoData?.title}
                </h1>
              </div>
              <div className="flex flex-col mt-2">
                <p>
                  {newsInfoData?.description} {newsInfoData?.description}{" "}
                  {newsInfoData?.description} {newsInfoData?.description}{" "}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsPreview;
