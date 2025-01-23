"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import DataTable from "react-data-table-component";
import { ImSpinner2 } from "react-icons/im";
import Search from "./Search";

const font1 = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const TableDashboard = ({
  filteredData,
  columns,
  isLoading,
  tableHeader,
}: any) => {
  const customStyles = {
    headRow: {
      style: {
        borderBottom: "2px solid var(--clr-silver-v5)",
        background: "rgb(241 245 249)",
      },
    },
    headCells: {
      style: {
        color: "var(--clr-black)",
        fontSize: "14px",
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "rgb(226 232 240)",
        color: "var(--clr-black)",
      },
      style: {
        color: "var(--clr-black-light)",
        borderBottom: "1px solid var(--clr-silver-v5)",
        outline: "1px solid var(--clr-silver-v5)",
        borderBottomRadius: "8px",
      },
    },
    pagination: {
      style: {
        border: "none",
        color: "var(--clr-black-light)",
        borderTopColor: "var(--clr-secondary)",
        width: "100",
      },
    },
    paginationRow: {
      style: {
        width: "100",
      },
    },

    subHeader: {
      style: {
        // paddingTop: "10px",
        // paddingBottom: "10px",
        borderRadius: "12px",
      },
    },
  };

  return (
    <div className="flex flex-col w-full shadow-md border rounded-[10px] pb-5">
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        fixedHeader
        paginationPerPage={6}
        paginationRowsPerPageOptions={[6, 7, 8, 10, 15, 20, 25, 30]}
        noContextMenu
        highlightOnHover
        customStyles={customStyles}
        subHeader
        progressPending={isLoading}
        progressComponent={
          <div className="flex items-center justify-center w-full  h-[20vh]">
            <ImSpinner2 className="animate-spin h-12 w-12 text-[var(--clr-secondary)]" />
          </div>
        }
        subHeaderComponent={
          <div className="w-full xsm:flex-row flex-col gap-4 md:gap-10 flex justify-between md:items-center mt-4  mb-4">
            <div className={`w-full relative flex  items-center `}>
              <h1
                className={cn(
                  " text-sm  text-[var(--clr-secondary)] font-bold ",
                  font1.className
                )}
              >
                {tableHeader}
              </h1>
            </div>

            <div className="flex justify-end w-full flex-1 ">
              <div className="form_div_search  xsm:w-[280px] w-full ">
                <Search placeholder="Search..." />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default TableDashboard;
