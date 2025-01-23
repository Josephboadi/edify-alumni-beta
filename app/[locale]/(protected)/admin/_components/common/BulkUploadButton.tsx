import Papa from "papaparse";
import { GrDocumentCsv } from "react-icons/gr";

const acceptableCSVFileTypes =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

const BulkUploadButton = ({ onUpdateCSVDataHandler, hideImportView }: any) => {
  const onFileChangeHandler = (event: any) => {
    const csvFile = event.target.files[0];

    Papa.parse(csvFile, {
      skipEmptyLines: true,
      header: true,
      // preview: 1,
      // worker: true,
      complete: function (results) {
        console.log(results);
        onUpdateCSVDataHandler(results.data);
        hideImportView(event);
      },
    });
  };
  return (
    <div className="flex justify-start items-center gap-2 hover:bg-[var(--clr-primary-light)] relative py-1 px-2 rounded-md">
      <span>
        <GrDocumentCsv className="text-green-600" />
      </span>

      {/* <label htmlFor="csvFileSelector" className=" p-10 text-black ">
        Bulk
      </label> */}
      {/* <div className="flex items-end h-6 justify-end ">
        <p className=" text-xs text-black font-semibold ">CSV</p>
      </div> */}
      <p className=" ">CSV</p>
      <input
        type="file"
        id="csvFileSelector"
        className="absolute !opacity-0 left-0 right-0 top-0 bottom-0  -z-1 "
        accept={acceptableCSVFileTypes}
        onChange={onFileChangeHandler}
      />
    </div>
  );
};

export default BulkUploadButton;
