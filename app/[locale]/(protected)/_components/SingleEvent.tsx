"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { eventListData } from "@/data/events";
import { EventData } from "@/schemas";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const SingleEvent = ({ eventData }: { eventData: EventData }) => {
  // const params = useParams();
  // const [eventData, setEventData] = useState<Event>();

  // useEffect(() => {
  //   eventListData.map((event) => {
  //     if (event.key.toString() === params.id.toString()) {
  //       setEventData(event);
  //     }
  //   });
  //   return;
  // }, []);

  return (
    <>
      <div className=" w-full">
        {eventData && (
          <div className="">
            <div className="relative  w-full p-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="w-full p-0 rounded-[16px] border-none">
                <CardContent className="relative h-[300px] w-full rounded-[16px]">
                  <Image
                    src={eventData?.image}
                    fill
                    alt="
                      -"
                    className="object-cover bg-no-repeat object-center rounded-[16px]"
                  />
                </CardContent>
              </Card>
              <div className="px-4 py-0 md:p-0 md:py-10 w-full flex flex-col gap-6 justify-end">
                <h1 className=" text-left text-xl font-bold text-[var(--clr-black)] line-clamp-1">
                  {eventData?.title}
                </h1>
                <div className="flex flex-row items-center gap-2">
                  <div className="w-[16px]  min-w-[16px] max-w-[16px] h-[16px] rounded-full bg-[var(--clr-green)]" />
                  <p className=" text-left text-sm font-semibold text-[var(--clr-black-light)] line-clamp-3">
                    Happening Today /{" "}
                    {moment(new Date(eventData?.eventStartTime)).format("LT")}{" "}
                    - {moment(new Date(eventData?.eventEndTime)).format("LT")}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <div className="w-[16px] min-w-[16px] max-w-[16px] h-[16px] rounded-full bg-[var(--clr-green)]" />
                  <p className=" text-left text-sm font-semibold text-[var(--clr-black-light)] line-clamp-3">
                    {eventData?.eventLocation}
                  </p>
                </div>

                <div className="flex mt-2">
                  <Button
                    variant={"default"}
                    size={"sm"}
                    asChild
                    className="flex items-center justify-center  !rounded-[6px]  bg-[var(--clr-secondary)] w-[90px] h-8 "
                  >
                    <Link
                      href={`#`}
                      className=" text-sm font-medium text-[var(--clr-primary)]"
                    >
                      Book Event
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full p-4 pb-0 pt-2">
              <h1 className="text-left text-lg font-bold text-[var(--clr-black)]">
                Event Description
              </h1>
              <p className=" text-left text-md font-normal text-[var(--clr-black-light)] ">
                {eventData?.information}
              </p>
            </div>

            <div className=" mt-6 mb-4 border-t-[1px] w-full border-[var(--clr-primary-light)]" />
            <div className="flex  gap-10 ">
              <div className="flex flex-wrap flex-1 items-center gap-3 px-4">
                <div>
                  <p className=" text-xl text-[var(--clr-jet-v1)]">
                    {moment(
                      new Date(eventData?.publishDate),
                      "YYYYMMDD"
                    ).fromNow()}
                  </p>
                </div>

                {eventData?.hashTags?.map((tag: any, index: any) => (
                  <div
                    className="w-[110px] min-w-[110px] px-[6px] h-[32px] bg-[var(--clr-secondary-light)] rounded-full flex items-center justify-center"
                    key={index}
                  >
                    <div className="w-full px-8 py-2 h-[32px] rounded-full bg-[var(--clr-secondary)] flex items-center justify-center">
                      <p className=" capitalize text-sm text-center font-semibold text-[var(--clr-primary)]">
                        #{tag.hash}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleEvent;
