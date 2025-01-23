"use client";
import Pagination from "@/components/common/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { discussionListData } from "@/data/discussionlist";
import { DiscussionListData } from "@/schemas";
import moment from "moment";
import Link from "next/link";

interface DiscussionListProps {
  pageCount: number;
  discussionsData: DiscussionListData;
}
const DiscussionList = ({
  pageCount,
  discussionsData,
}: DiscussionListProps) => {
  // const searchParams = useSearchParams();
  // const [discussionData, setDiscussionData] = useState<DiscussionListData>([]);
  // const [filteredData, setFilteredData] = useState<DiscussionListData>([]);
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(4);
  // const [pageCount, setPageCount] = useState(0);

  // useEffect(() => {
  //   setDiscussionData(discussionListData);
  // }, []);

  // useEffect(() => {
  //   let result = discussionData;

  //   if (q.length > 3) {
  //     result = result.filter((discussion) => {
  //       return (
  //         discussion.topic.toLowerCase().includes(q.toLowerCase()) ||
  //         discussion.hashTags.some((tag) =>
  //           tag.toLowerCase().includes(q.toLowerCase())
  //         )
  //       );
  //     });
  //   }

  //   setPageCount(Math.ceil(result?.length / limit));
  //   const skip = (page - 1) * limit;

  //   setFilteredData(result?.slice(skip, skip + limit));
  //   return;
  // }, [discussionData]);

  // useEffect(() => {
  //   const getDiscussionList = async () => {
  //     let result = discussionData;

  //     if (q.length > 3) {
  //       result = result.filter((discussion) => {
  //         return (
  //           discussion.topic.toLowerCase().includes(q.toLowerCase()) ||
  //           discussion.hashTags.some((tag) =>
  //             tag.toLowerCase().includes(q.toLowerCase())
  //           )
  //         );
  //       });
  //     }
  //     setPageCount(Math.ceil(result?.length / limit));
  //     const skip = (page - 1) * limit;
  //     result = result?.slice(skip, skip + limit);

  //     const discussionsData = await result;

  //     setFilteredData(discussionsData);
  //   };

  //   getDiscussionList();

  //   return function cleanup() {
  //     getDiscussionList();
  //   };
  // }, [q, page, discussionData]);

  // const handlePageClick = (data: any) => {
  //   setPage(data.selected + 1);
  // };

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        {discussionsData?.map((discussion) => (
          <Card
            key={discussion.key}
            className="w-full bg-[var(--clr-silver-v4)] shadow-md !px-0 py-3  rounded-[12px] border-none"
          >
            <CardContent className="relative w-full px-3 sm:px-4">
              <div className="flex justify-between gap-4">
                <div className="flex gap-2 flex-1">
                  <Avatar className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] relative">
                    {/* <Suspense
                                    fallback={
                                      <FaSpinner className="animate-spin" />
                                    }
                                  > */}
                    <AvatarImage src={discussion?.image || ""} />
                    {/* </Suspense> */}
                    <AvatarFallback className="bg-[var(--clr-secondary)] text-[var(--clr-primary)] text-lg font-bold">
                      {discussion?.createdBy?.split("")?.shift()?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-wrap flex-1 mt-[6px] gap-[6px]">
                    <p className=" text-[14px] leading-4 font-bold text-[var(--clr-secondary)]">
                      {discussion?.topic}
                    </p>
                    <p className=" text-xs font-normal text-[var(--clr-black-light)]">
                      By {discussion?.createdBy}
                    </p>
                  </div>
                </div>
                <div className=" mt-1">
                  <p className=" text-center text-xs font-semibold italic text-[var(--clr-black-light)]">
                    {moment(discussion.createdAt).format("ll")}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 w-full flex  py-0">
              <div className="flex justify-between gap-4 w-full">
                <div className="flex flex-1 flex-wrap gap-2 items-center px-1">
                  {discussion?.hashTags?.map((tag:any, index:any) => (
                    <p
                      key={index}
                      className=" capitalize text-xs text-center font-semibold text-[var(--clr-black-light)]"
                    >
                      #{tag.hash}
                    </p>
                  ))}
                </div>
                <Button
                  variant={"default"}
                  size={"sm"}
                  asChild
                  className="flex items-center justify-center  !rounded-full  bg-[var(--clr-green)] w-[100px] h-8 px-4 "
                >
                  <Link
                    href={`/discussion/${discussion.key}`}
                    className=" text-sm font-medium text-[var(--clr-primary)]"
                  >
                    Comment
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination pageCount={pageCount} />
      {/* <div className="mt-10 mb-4">
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

export default DiscussionList;
