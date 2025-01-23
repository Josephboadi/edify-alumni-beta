"use client";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
// import { scholarshipListData } from "@/data/scholarshiplist";
import { ScholarshipListData } from "@/schemas";
import { useAppStore } from "@/store/store";
import Image from "next/image";
import { ScholarshipApplicationButton } from "./scholarshipapplicationform/scholarshipapplication-button";

interface ScholarshipListProps {
  pageCount: number;
  scholarshipsData: ScholarshipListData;
}
const ScholarshipList = ({
  pageCount,
  scholarshipsData,
}: ScholarshipListProps) => {
  const { setScholarshipInfoData } = useAppStore();

  return (
    <>
      <div className="divide-y divide-[var(--clr-black)] border-b border-[var(--clr-black)]">
        {scholarshipsData?.map((scholarship) => (
          <div
            className="w-full flex md:flex-wrap md:flex-row flex-col gap-2 px-0 py-3 sm:p-5"
            key={scholarship.key}
          >
            <div className=" w-full md:w-[200px] h-[180px] xs:w-[300px] xs:h-[200px] md:h-[150px] relative rounded-[5px]">
              <Image src={scholarship.image} fill alt="-" />
            </div>

            <div className="flex flex-1 flex-col md:flex-row gap-4 p-2">
              <div className="flex flex-1 flex-col gap-4">
                <h1 className=" font-bold">{scholarship.title}</h1>
                <p>{scholarship.information}</p>
              </div>
              <div className=" w-full md:w-[90px] flex justify-start md:justify-start items-end h-full">
                <ScholarshipApplicationButton asChild>
                  <Button
                    variant={"default"}
                    size={"sm"}
                    asChild
                    className="flex items-center justify-center  !rounded-[6px]  bg-[var(--clr-secondary-light)] w-[90px] h-8 "
                    onClick={() => setScholarshipInfoData(scholarship)}
                  >
                    <div className=" text-sm font-medium text-[var(--clr-primary)]">
                      Apply
                    </div>
                  </Button>
                </ScholarshipApplicationButton>
              </div>
            </div>
          </div>
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

export default ScholarshipList;
