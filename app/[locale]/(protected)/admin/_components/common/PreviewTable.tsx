"use client";

// import convertArrayOfObjectsToCSV from "@/utils/convertArray";
import DataTable from "react-data-table-component";
// import ToolTip from "./ToolTip";
import ToolTip from "@/components/common/ToolTip";
import { BiSend } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";
import PreviewSearch from "./PreviewSearch";

const PreviewTable = ({
  extractedData,
  columns,
  isLoading,
  submitData,
  selectedData,
  handleSelectedRoles,
  isPreviewSubmiting,
  isForm,
  handleOpenPreviewButtonClick,
}: any) => {
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
        data={extractedData}
        pagination
        fixedHeader
        // fixedHeaderScrollHeight="66vh"
        selectableRows
        selectableRowsHighlight
        paginationPerPage={7}
        paginationRowsPerPageOptions={[6, 7, 8, 10, 15, 20, 25, 30]}
        noContextMenu
        highlightOnHover
        customStyles={customStyles}
        // striped
        onSelectedRowsChange={handleSelectedRoles}
        subHeader
        progressPending={isLoading}
        progressComponent={
          <div className="flex items-center justify-center w-full  h-[20vh]">
            <ImSpinner2 className="animate-spin h-12 w-12 text-[var(--clr-secondary)]" />
          </div>
        }
        subHeaderComponent={
          <div
            className={`w-full xsm:flex-row  flex-col gap-4 md:gap-10 flex justify-between md:items-center mt-4  mb-4`}
          >
            <div className="flex justify-start w-full flex-1 ">
              <div className="form_div_search  xsm:w-[280px] w-full ">
                <PreviewSearch placeholder="Search..." />
              </div>
            </div>

            {isForm ? (
              <>
                <button
                  disabled={selectedData.length < 1 ? true : false}
                  className={`w-14 gap-4 relative flex flex-row-reverse xsm:flex-row items-center justify-between `}
                >
                  <div
                    className="flex items-center justify-start xsm:justify-center"
                    onClick={handleOpenPreviewButtonClick}
                  >
                    <ToolTip tooltip="Submit Data">
                      <div>
                        <BiSend
                          className={`text-3xl ${selectedData.length < 1 ? "text-gray-400" : "!text-[var(--clr-secondary)]"}  shadow-sm`}
                        />
                      </div>
                    </ToolTip>
                  </div>
                </button>
              </>
            ) : (
              <button
                disabled={
                  selectedData.length < 1 || isPreviewSubmiting ? true : false
                }
                className={`w-14 gap-4 relative flex flex-row-reverse xsm:flex-row items-center justify-between `}
              >
                <div
                  className="flex items-center justify-start xsm:justify-center"
                  onClick={submitData}
                >
                  <ToolTip tooltip="Submit Data">
                    <div>
                      <BiSend
                        className={`text-3xl ${selectedData.length < 1 || isPreviewSubmiting ? "text-gray-400" : "!text-[var(--clr-secondary)]"}  shadow-sm`}
                      />
                    </div>
                  </ToolTip>
                </div>
              </button>
            )}
          </div>
        }
        // subHeaderAlign="left"
      />
    </div>
  );
};

export default PreviewTable;
