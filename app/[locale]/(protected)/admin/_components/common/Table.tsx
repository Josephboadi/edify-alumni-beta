"use client";
import { saveAs } from "file-saver";
import { useEffect, useRef, useState } from "react";
import { CgAddR } from "react-icons/cg";
// import convertArrayOfObjectsToCSV from "@/utils/convertArray";
import DataTable from "react-data-table-component";
import { RiFileExcel2Line } from "react-icons/ri";
// import ToolTip from "./ToolTip";
import ToolTip from "@/components/common/ToolTip";
import { convertArrayOfObjectsToCSV } from "@/lib/utils";
import { BiExport, BiImport } from "react-icons/bi";
import { ImDownload, ImSpinner2 } from "react-icons/im";
import BulkUploadButton from "./BulkUploadButton";
import Search from "./Search";
import { FormButton } from "./form-button";

const Table = ({
  filteredData,
  columns,
  isLoading,
  search,
  setSearch,
  report,
  reportFilename,
  addButtonTitle,
  addModal,
  isAdd,
  isBulk,
  template,
  bulkUploadTitle,
  onUpdateCSVDataHandler,
}: any) => {
  const [showReport, setShowReport] = useState<boolean>();
  const [showImport, setShowImport] = useState<boolean>();
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const contextImportRef = useRef<HTMLDivElement>(null);

  const saveFile = () => {
    saveAs(template, bulkUploadTitle);
    setShowImport(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        contextImportRef.current &&
        !contextImportRef.current.contains(event.target)
      ) {
        setShowImport(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setShowReport(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function downloadCSV(array: any) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV({ array: array, data: report });
    if (csv == null) return;

    const filename = `${reportFilename}.csv`;

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();

    setShowReport(false);
  }

  const Export = ({ onExport }: any) => (
    <button
      onClick={(e: any) => onExport(e.target.value)}
      className="flex justify-start items-center gap-2 hover:bg-[var(--clr-primary-light)] py-1 px-3 rounded-md"
    >
      <span>
        <RiFileExcel2Line className="text-green-600" />
      </span>
      Excel
    </button>
  );

  const showImportView = () => {
    setShowImport(!showImport);
  };

  const hideImportView = (e: any) => {
    e.stopPropagation();
    setShowImport(false);
  };

  const showReportView = () => {
    setShowReport(!showReport);
  };

  const hideReportView = (e: any) => {
    e.stopPropagation();
    setShowReport(false);
  };

  const customStyles = {
    headRow: {
      style: {
        // borderTopColor: "#ed8b00",
        // borderTop: "2px solid var(--clr-silver-v5)",
        borderBottom: "2px solid var(--clr-silver-v5)",
        // borderLeft: "1px solid var(--clr-silver-v5)",
        // borderRight: "1px solid var(--clr-silver-v5)",
        // background: "rgb(226 232 240)",
        background: "rgb(241 245 249)",
        // borderBottomRadius: "8px",
        // boxShadow: "2px 2px 2px 2px rgb(0 0 0 / 10%)",
        // background:
        //   "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 100%)",
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
        // backgroundColor: "var(--clr-secondary-trans1)",
        backgroundColor: "rgb(226 232 240)",
        // borderBottomColor: "var(--clr-white)",
        color: "var(--clr-black)",
        // borderRadius: "5px",
        // outline: "1px solid var(--clr-white)",
      },
      style: {
        // background: "rgb(226 232 240)",
        // background: "rgb(241 245 249)",
        color: "var(--clr-black-light)",
        borderBottom: "1px solid var(--clr-silver-v5)",
        // borderLeft: "1px solid var(--clr-silver-v5)",
        // borderRight: "1px solid var(--clr-silver-v5)",
        outline: "1px solid var(--clr-silver-v5)",
        borderBottomRadius: "8px",
      },
    },
    pagination: {
      style: {
        border: "none",
        // marginTop: "-40px",
        // background: "rgb(226 232 240)",
        // background: "rgb(241 245 249)",
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
        // background: "rgb(226 232 240)",
        // background: "rgb(241 245 249)",
        // boxShadow: "2px 2px 2px 2px rgb(0 0 0 / 8%)",
        paddingTop: "10px",
        paddingBottom: "10px",
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
        // fixedHeaderScrollHeight="66vh"
        paginationPerPage={7}
        paginationRowsPerPageOptions={[6, 7, 8, 10, 15, 20, 25, 30]}
        noContextMenu
        highlightOnHover
        customStyles={customStyles}
        // striped
        subHeader
        progressPending={isLoading}
        progressComponent={
          <div className="flex items-center justify-center w-full  h-[20vh]">
            <ImSpinner2 className="animate-spin h-12 w-12 text-[var(--clr-secondary)]" />
          </div>
        }
        subHeaderComponent={
          <div className="w-full xsm:flex-row flex-col gap-4 md:gap-10 flex justify-between md:items-center mt-4  mb-4">
            <div className="flex justify-start w-full flex-1 ">
              <div className="form_div_search  xsm:w-[280px] w-full ">
                <Search placeholder="Search..." />
              </div>
            </div>

            <div
              className={`w-full xsm:w-24 sm:w-48 gap-4 relative flex flex-row-reverse xsm:flex-row items-center  ${
                isAdd ? "justify-between" : "justify-end"
              } `}
            >
              {/* {myInfo &&
                (addRoles(
                  myInfo?.permissions ? JSON?.parse(myInfo?.permissions) : []
                ) ||
                  addRoles(
                    rolePermissions ? JSON?.parse(rolePermissions) : []
                  )) && ( */}
              {isAdd && (
                <div
                  className="sm:w-32 flex items-center justify-start xsm:justify-center cursor-pointer"
                  // onClick={addModal}
                >
                  <ToolTip tooltip={addButtonTitle}>
                    <FormButton asChild Form={addModal}>
                      <div>
                        <CgAddR className="text-2xl  !text-[var(--clr-secondary)] shadow-sm" />
                      </div>
                    </FormButton>
                  </ToolTip>
                </div>
              )}

              {/* )} */}
              <div className=" flex flex-row items-center justify-center gap-4">
                {isBulk && (
                  <div
                    ref={contextImportRef}
                    className=" flex flex-col items-center justify-center gap-2"
                  >
                    <div className="flex items-center justify-center  ">
                      <ToolTip tooltip="Import">
                        <BiImport
                          className="text-[25px] text-[var(--clr-black-light)]"
                          onClick={() => showImportView()}
                        />
                      </ToolTip>

                      {showImport && (
                        <div
                          // ref={contextMenuRef}
                          className="absolute py-6 px-2 bg-[var(--clr-primary)] border-[1px] border-[var(--clr-primary-light)] rounded-md top-4 right-0 shadow-lg z-40 gap-4 flex flex-col justify-start"
                        >
                          <div className="flex items-center justify-center  ">
                            <button
                              // href="/templates/text.csv"
                              onClick={saveFile}
                              className="flex justify-start items-center gap-2 hover:bg-[var(--clr-primary-light)] py-1 px-2 rounded-md"
                              // download={"template"}
                            >
                              <span>
                                <ImDownload className="text-green-600" />
                              </span>
                              Template
                            </button>
                          </div>

                          <BulkUploadButton
                            onUpdateCSVDataHandler={onUpdateCSVDataHandler}
                            hideImportView={hideImportView}
                            // onClick={(e: any) => hideImportView(e)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div
                  ref={contextMenuRef}
                  className=" flex flex-row items-center justify-center"
                >
                  <ToolTip tooltip="Export">
                    <BiExport
                      className="text-[25px] text-[var(--clr-black-light)]"
                      onClick={() => showReportView()}
                    />
                  </ToolTip>
                  {showReport && (
                    <div
                      // ref={contextMenuRef}
                      className="absolute py-6 px-2 bg-[var(--clr-primary)] border-[1px] border-[var(--clr-primary-light)] rounded-md top-4 right-0 shadow-lg z-40 gap-2 flex flex-col justify-start"
                    >
                      <Export
                        onExport={() => downloadCSV(report)}
                        onClick={(e: any) => hideReportView(e)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        }
        // subHeaderAlign="left"
      />
    </div>
  );
};

export default Table;
