"use client";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
// import { jobListData } from "@/data/joblist";
import { JobListData } from "@/schemas";
import Link from "next/link";
import { useEffect, useState } from "react";

interface JobListProps {
  pageCount: number;
  jobsData: JobListData;
}
const JobList = ({ pageCount, jobsData }: JobListProps) => {
  // const { setJobInfoData } = useAppStore();
  const [jobData, setJobData] = useState<any>([]);
  // const [filteredData, setFilteredData] = useState<JobListData>([]);
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(2);
  // const [pageCount, setPageCount] = useState(0);
  console.log(jobsData);

  useEffect(() => {
    const modifyData = async () => {
      const groupedBy = jobsData?.reduce((acc: any, jbd: any) => {
        const jcat = jbd.categoryName;
        (acc[jcat] = acc[jcat] || []).push(jbd);
        return acc;
      }, {});

      await setJobData(Object?.values(groupedBy));
      // function groupBy(arr: any, property: any) {
      //   return arr.reduce(function (memo: any, x: any) {
      //     if (!memo[x[property]]) {
      //       memo[x[property]] = [];
      //     }
      //     memo[x[property]].push(x);
      //     return memo;
      //   }, {});
      // }
      // await setJobData(groupBy(jobsData, "categoryName"));
    };
    modifyData();
  }, [jobsData]);

  console.log(jobData);
  // useEffect(() => {
  //   let result = jobData;
  //   if (q.length > 3) {
  //     result = result.filter((job) =>
  //       job.List.every(({ title }) => {
  //         return title.toLowerCase().includes(q.toLowerCase());
  //       })
  //     );
  //   }
  //   setPageCount(Math.ceil(result?.length / limit));
  //   const skip = (page - 1) * limit;

  //   setFilteredData(result?.slice(skip, skip + limit));
  //   return;
  // }, [jobData]);

  // useEffect(() => {
  //   const getJobList = async () => {
  //     let result = jobData;
  //     if (q.length > 3) {
  //       result = result.filter((job) =>
  //         job.List.every(({ title }) => {
  //           return title.toLowerCase().includes(q.toLowerCase());
  //         })
  //       );
  //     }
  //     setPageCount(Math.ceil(result?.length / limit));
  //     const skip = (page - 1) * limit;
  //     result = result?.slice(skip, skip + limit);

  //     const jobsData = await result;

  //     setFilteredData(jobsData);
  //   };

  //   getJobList();

  //   return function cleanup() {
  //     getJobList();
  //   };
  // }, [q, page, jobData]);

  // const handlePageClick = (data: any) => {
  //   setPage(data.selected + 1);
  // };

  return (
    <>
      <div className="divide-y divide-[var(--clr-black)] border-b border-[var(--clr-black)]">
        {jobData?.map((job: any, index: any) => (
          <div className="w-full" key={index}>
            <div className=" w-full border-b border-[var(--clr-black)]  py-3">
              <div className="py-1 px-6 rounded-full border border-[var(--clr-black)] w-max">
                <p className=" text-sm font-normal">{job[0].categoryName}</p>
              </div>
            </div>

            <div className="w-full flex gap-3 items-center h-max relative">
              <div className=" absolute left-0 top-0 bottom-0 flex flex-col justify-around h-full">
                {job.map((list: any) => (
                  <div
                    className="w-3 h-3 rounded-full bg-[var(--clr-pumpkin)]"
                    key={list.id}
                  ></div>
                ))}
              </div>

              <div className="divide-y ml-5 mr-[84px]  divide-[var(--clr-silver-v3)] flex-grow">
                {job?.map((list: any) => (
                  <div key={list.id} className="py-4 pl-3">
                    <p className=" text-sm font-medium">{list.title}</p>
                  </div>
                ))}
              </div>
              <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-around h-full ">
                {job?.map((list: any) => (
                  <Button
                    variant={"default"}
                    size={"sm"}
                    asChild
                    className="flex items-center justify-center  !rounded-[6px]  bg-[var(--clr-secondary)] w-[70px] h-8 "
                    key={list.id}
                  >
                    <Link
                      href={`/job/${list.id}`}
                      className=" text-sm font-medium text-[var(--clr-primary)]"
                    >
                      Apply
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))}
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

export default JobList;
