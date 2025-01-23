"use client";
import Pagination from "@/components/common/Pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { eventListData } from "@/data/events";
import { EventListData } from "@/schemas";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

interface EventListProps {
  pageCount: number;
  eventsData: EventListData;
}
const EventList = ({ pageCount, eventsData }: EventListProps) => {
  // const [eventData, setEventData] = useState<EventListData>([]);
  // const [todayEvent, setTodayEvent] = useState<Event>();
  // const [filteredData, setFilteredData] = useState<EventListData>([]);
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  // const [pageCount, setPageCount] = useState(0);

  // useEffect(() => {
  //   setEventData(eventListData);
  // }, []);

  // useEffect(() => {
  //   let result = eventData;
  //   const today = result?.filter((event) => event.isEventDay == true);

  //   setTodayEvent(today[0]);

  //   setPageCount(Math.ceil(result?.length / limit));
  //   const skip = (page - 1) * limit;

  //   setFilteredData(result?.slice(skip, skip + limit));
  //   return;
  // }, [eventData]);

  // useEffect(() => {
  //   const getEventList = async () => {
  //     let result = eventData;

  //     setPageCount(Math.ceil(result?.length / limit));
  //     const skip = (page - 1) * limit;
  //     result = result?.slice(skip, skip + limit);

  //     const eventsData = await result;

  //     setFilteredData(eventsData);
  //   };

  //   getEventList();

  //   return function cleanup() {
  //     getEventList();
  //   };
  // }, [page, eventData]);

  // const handlePageClick = (data: any) => {
  //   setPage(data.selected + 1);
  // };

  return (
    <>
      {eventsData?.filter((event) => event.isEventDay == true)[0] && (
        <div className="border-b border-[var(--clr-black)]">
          <Link
            href={`/event/${eventsData?.filter((event) => event.isEventDay == true)[0].key}`}
            className="relative hover:cursor-pointer rounded-[16px] transition-all duration-300 hover:scale-95 hover:shadow-xl w-full p-4 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="w-[18px] z-10  min-w-[18px] max-w-[18px] h-[18px] absolute top-2 left-2 !border-[4px] !border-[var(--clr-black)] rounded-full bg-green-400 "></div>
            <Card className="w-full p-0 rounded-[16px] border-none">
              <CardContent className="relative h-[300px] w-full rounded-[16px]">
                <Image
                  src={
                    eventsData?.filter((event) => event.isEventDay == true)[0]
                      ?.image
                  }
                  fill
                  alt="
                      -"
                  className="object-cover bg-no-repeat object-center rounded-[16px]"
                />
              </CardContent>
            </Card>
            <div className="px-4 py-0 sm:p-0 sm:py-10 w-full flex flex-col gap-4 justify-end">
              <h1 className=" text-left text-xl font-bold text-[var(--clr-black)] line-clamp-1">
                {
                  eventsData?.filter((event) => event.isEventDay == true)[0]
                    ?.title
                }
              </h1>
              <div className="flex flex-row items-center gap-2">
                <div className="w-[16px]  min-w-[16px] max-w-[16px] h-[16px] rounded-full bg-[var(--clr-green)]" />
                <p className=" text-left text-sm font-semibold text-[var(--clr-black-light)] line-clamp-3">
                  Happening Today /{" "}
                  {moment(
                    new Date(
                      eventsData?.filter(
                        (event) => event.isEventDay == true
                      )[0].eventStartTime
                    )
                  ).format("LT")}{" "}
                  -{" "}
                  {moment(
                    new Date(
                      eventsData?.filter(
                        (event) => event.isEventDay == true
                      )[0].eventEndTime
                    )
                  ).format("LT")}
                </p>
              </div>

              <div className="flex flex-row items-center gap-2">
                <div className="w-[16px] min-w-[16px] max-w-[16px] h-[16px] rounded-full bg-[var(--clr-green)]" />
                <p className=" text-left text-sm font-semibold text-[var(--clr-black-light)] line-clamp-3">
                  {
                    eventsData?.filter((event) => event.isEventDay == true)[0]
                      ?.eventLocation
                  }
                </p>
              </div>

              <p className=" text-left text-sm font-normal text-[var(--clr-black-light)] line-clamp-3">
                {
                  eventsData?.filter((event) => event.isEventDay == true)[0]
                    ?.information
                }
              </p>
            </div>
          </Link>
        </div>
      )}

      <div className="w-full mt-5 mb-2">
        <p className="text-center font-bold">Upcoming Event</p>
      </div>

      <div className="w-full ">
        <div className="w-full basis-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          {eventsData?.map(
            (event) =>
              !event.isEventDay && (
                <Link
                  href={`/event/${event.key}`}
                  className="group relative  p-4 py-2 w-full hover:cursor-pointer"
                  key={event.key}
                >
                  <Card className="w-full group-hover:cursor-pointer transition-all duration-300 group-hover:scale-95 group-hover:shadow-xl p-0 rounded-[16px] border-none">
                    <CardContent className="relative h-[150px] w-full rounded-t-[16px] rounded-b-[8px] shadow-sm">
                      <Image
                        src={event.image}
                        fill
                        alt="
                      -"
                        className="object-cover bg-no-repeat object-center rounded-t-[16px] rounded-b-[8px]"
                      />
                    </CardContent>

                    <CardFooter className="px-6 w-full flex justify-center mt-3 py-0">
                      <p className=" text-center text-sm font-bold text-[var(--clr-blue)] line-clamp-1">
                        {event.title}
                      </p>
                    </CardFooter>

                    <CardFooter className="px-6 w-full flex justify-center mt-1 py-0">
                      <p className=" text-center text-sm font-normal text-[var(--clr-black-light)] line-clamp-3">
                        {event.information}
                      </p>
                    </CardFooter>

                    <CardFooter className="px-6 w-full flex justify-center mt-2 mb-5 pt-0">
                      <p className=" text-center text-sm font-bold text-[var(--clr-black)] line-clamp-1">
                        {moment(event.eventDate).format("ll")}
                      </p>
                    </CardFooter>
                  </Card>
                  {/* <div className="w-full   " key={event.key}>
                    <div className=" w-full relative   py-3 h-[150px]  rounded-[16px]">
                      <Image
                        src={event.image}
                        fill
                        alt="
                      -"
                        className="object-cover bg-no-repeat object-center rounded-[16px]"
                      />
                    </div>
                  </div> */}
                  {/* <div className=" absolute bottom-0 left-0 right-0 border-t-[1px] w-full border-[var(--clr-black)]" /> */}
                </Link>
              )
          )}
        </div>
      </div>
      <Pagination pageCount={pageCount} />
      {/* <div className="mt-10">
        <nav>
          <ReactPaginate
            previousLabel={
              <div className="page-item">
                <div className="page-link p-0 w-8 h-8 grid place-content-center lh-1 rounded-full border border-[var(--clr-secondary)] text-[var(--clr-secondary)]">
                  <ChevronLeftIcon className="w-5 h-5" />
                </div>
              </div>
            }
            nextLabel={
              <div className="page-item">
                <div className="page-link p-0 w-8 h-8 grid place-content-center lh-1 rounded-full border border-[var(--clr-secondary)] text-[var(--clr-secondary)]">
                  <ChevronRightIcon className="w-5 h-5" />
                </div>
              </div>
            }
            breakLabel={
              <div className="page-link p-0 w-8 h-8 grid place-content-center lh-1 rounded-full border border-[var(--clr-secondary)] text-[var(--clr-secondary)]">
                ...
              </div>
            }
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"flex flex-wrap gap-3 justify-center"}
            pageClassName={
              "page-item page-link p-0 w-8 h-8 grid place-content-center lh-1 rounded-full border border-[var(--clr-secondary)] text-[var(--clr-secondary)]"
            }
            pageLinkClassName={"page-item"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-item"}
            activeClassName={"bg-[var(--clr-secondary)] text-white"}
          />
        </nav>
      </div> */}
    </>
  );
};

export default EventList;
