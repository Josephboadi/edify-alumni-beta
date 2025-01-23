"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount }: { pageCount: number }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);

  const handlePageClick = (data: any) => {
    //   setPage(data.selected + 1);
    params.set("page", data.selected + 1);
    replace(`${pathname}?${params}`);
  };
  return (
    <div className="mt-10 mb-4">
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
    </div>
  );
};

export default Pagination;
