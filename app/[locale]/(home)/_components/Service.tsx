import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Montserrat_Alternates } from "next/font/google";
import Image from "next/image";

const font = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});
const Service = () => {
  return (
    <>
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-9 gap-6 w-full place-items-center md:place-items-start ">
        <div className="w-full md:col-span-2 h-[250px] md:h-full relative">
          <Image
            src="/service/image1.png"
            fill
            alt="-"
            className=" object-cover object-center"
          />
        </div>
        <div className="md:col-span-4 lg:col-span-5">
          <div className="flex w-full flex-col justify-between md:min-h-[350px]">
            <div className="w-full flex flex-col gap-3 lg:gap-5">
              <p>
                Lorem ipsum dolor sit amet consectetur. Mauris risus massa
                accumsan a eleifend in in integer. Enim hendrerit nec eu nullam
                vitae faucibus. Sed morbi posuere commodo nam fusce. Amet
                aliquam egestas lorem lacinia id duis.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur. Mauris risus massa
                accumsan a eleifend in in integer. Enim hendrerit nec eu nullam
                vitae faucibus. Sed morbi posuere commodo nam fusce. Amet
                aliquam egestas lorem lacinia id duis.
              </p>
            </div>

            <div className="w-full flex items-center justify-center ">
              <Button
                variant={"default"}
                size={"lg"}
                className="flex items-center justify-center !py-6 !rounded-full gap-5 mt-10  bg-[var(--clr-secondary)] px-10 sm:px-16 "
              >
                <p
                  className={cn(
                    "text-md text-[var(--clr-primary)] font-semibold  text-center",
                    font.className
                  )}
                >
                  Proceed to Support Center
                </p>
              </Button>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 w-full h-[250px] md:h-full relative">
          <Image
            src="/service/image2.png"
            fill
            alt="-"
            className=" object-cover"
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 sm:gap-12 mt-6">
        <div className="flex flex-col items-center">
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

        <div className="flex flex-col items-center">
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

        <div className="flex flex-col items-center">
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
      </div>
    </div>
    </>
  );
};

export default Service;
