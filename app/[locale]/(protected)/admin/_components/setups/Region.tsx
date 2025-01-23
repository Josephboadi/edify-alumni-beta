"use client";

import ToolTip from "@/components/common/ToolTip";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { VscActivateBreakpoints } from "react-icons/vsc";
import Breadcrump from "../common/Breadcrump";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// import { CardWrapper } from "@/components/auth/card-wrapper";
import { getcontinent } from "@/actions/continent";
import {
  addbatchsubregion,
  addsubregion,
  getsubregion,
  updatesubregion,
} from "@/actions/sub-region";
import DropdownContinent from "@/components/common/DropdownContinent";
import ModalForm from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { SubRegionSchema } from "@/schemas";
import { createPortal } from "react-dom";
import { ImSpinner2 } from "react-icons/im";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { AlertButton } from "../common/alert-button";
import { AlertCardWrapper } from "../common/alert-card-wrapper";
import { CardWrapper } from "../common/card-wrapper";
import ModalTable from "../common/ModalTable";
import { PreviewCardWrapper } from "../common/preview-card-wrapper";
import PreviewTable from "../common/PreviewTable";
import { Continent } from "./Continent";

export type Region = {
  id: string;
  subreion_id: string;
  subregion_name: string;
  continent_id: string;
  date_created: string;
  status: boolean;
  continent: Continent;
};

export const ContinentIDSchema = z.object({
  continent_id: z.string().min(1, {
    message: "Continent id is required",
  }),
});

export function RegionDataTable() {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [dataList, setDataList] = useState<Region[]>([]);
  const [filteredData, setFilteredData] = useState<Region[]>([]);
  const [continentData, setContinentData] = useState<Continent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const [report, setReport] = useState<any>([]);
  const { locale } = useParams();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isAddingSubRegion, setIsAddingSubRegion] = useState<boolean>(false);
  const [isEditingSubRegion, setIsEditingSubRegion] = useState<boolean>(false);
  const [singleId, setSingleId] = useState<string | undefined>("");

  const pq = searchParams.get("pq") ? searchParams.get("pq") : "";
  const [csvData, setCsvData] = useState<any>([]);
  const [csvFilteredData, setCsvFilteredData] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<Region[]>([]);
  const [previewData, setPreviewData] = useState<boolean>(false);
  const [selectContinent, setSelectContinent] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SubRegionSchema>>({
    resolver: zodResolver(SubRegionSchema),
    defaultValues: {
      subregion_name: "",
      continent_id: "",
    },
  });

  const form1 = useForm<z.infer<typeof ContinentIDSchema>>({
    resolver: zodResolver(ContinentIDSchema),
    defaultValues: {
      continent_id: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SubRegionSchema>) => {
    setError("");
    setSuccess("");

    if (isAddingSubRegion) {
      startTransition(() => {
        addsubregion(values, locale)
          .then((data) => {
            // console.log(data);
            if (data?.error) {
              form.reset();
              // setError(data.error);
              toast({
                title: "Error",
                description: data.error,
                variant: "destructive",
              });
              handleCloseButtonClickAddEdit();
            }
            if (data?.success) {
              form.reset();
              // setSuccess(data.success);
              toast({
                title: "Success",
                description: data.success,
                variant: "default",
              });
              setFilteredData(data.data);
              handleCloseButtonClickAddEdit();
            }
          })
          .catch(() => setError("Something went wrong"));
      });
    }

    if (isEditingSubRegion) {
      startTransition(() => {
        updatesubregion(values, locale, singleId!)
          .then(async (data) => {
            // console.log(data);
            if (data?.error) {
              form.reset();
              // setError(data.error);
              toast({
                title: "Error",
                description: data.error,
                variant: "destructive",
              });
              handleCloseButtonClickAddEdit();
            }
            if (data?.success) {
              form.reset();
              // setSuccess(data.success);
              toast({
                title: "Success",
                description: data.success,
                variant: "default",
              });
              setFilteredData(data.data);
              handleCloseButtonClickAddEdit();
            }
          })
          .catch(() => setError("Something went wrong"));
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const data = await getsubregion();
      if (data?.success) {
        setDataList(data?.data);
        setIsLoading(false);
      } else if (data?.error) {
        setDataList([]);
        setIsLoading(false);
        // setError(data?.error);
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      } else {
        setDataList([]);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    // setIsLoading(true);
    const getData = async () => {
      const data = await getcontinent();
      if (data?.success) {
        setContinentData(data?.data);
        // setIsLoading(false);
      } else if (data?.error) {
        setContinentData([]);
        // setIsLoading(false);
        // setError(data?.error);
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      } else {
        setContinentData([]);
        // setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setFilteredData(dataList);

      const rep: any = dataList?.map((dat: any) => {
        return {
          ID: dat.subregion_id,
          "Sub-Region Name": dat.subregion_name,
          "Continent Name": dat.continent.continent_name,
          Status: dat.status,
        };
      });

      setReport(rep);
    };
    getData();
  }, [dataList]);

  useEffect(() => {
    let result = dataList;
    if (q && q.length > 3) {
      result = dataList.filter((data: any) => {
        return (
          data?.subregion_name.toLowerCase().includes(q.toLowerCase()) ||
          data?.continent?.continent_name
            .toLowerCase()
            .includes(q.toLowerCase()) ||
          parseInt(data?.status) == parseInt(q)
        );
      });
    }
    setFilteredData(result);
  }, [q]);

  useEffect(() => {
    let presult = csvData;
    if (pq && pq.length > 3) {
      presult = csvData.filter((data: any) => {
        return data?.subregion_name.toLowerCase().includes(pq.toLowerCase());
      });
    }
    setCsvFilteredData(presult);
  }, [pq]);

  const HandleConfirmPromt = ({
    alertText,
    alertType = "normal",
  }: {
    alertText: String;
    alertType?: "normal" | "danger";
  }) => {
    return (
      <AlertCardWrapper>
        <div className="gap-6 w-[260px] xs:w-[300px] h-[260px] sm:w-[340px] flex flex-col items-center justify-center">
          <div>
            <h1
              className={`${alertType === "normal" ? "text-[var(--clr-green)]" : "text-[var(--clr-scarlet)]"} text-3xl font-bold`}
            >
              Alert!
            </h1>
          </div>
          <div>
            <TbAlertTriangleFilled
              className={` animate-pulse text-7xl ${alertType === "normal" ? "text-[var(--clr-green)]" : "text-[var(--clr-scarlet)]"}`}
            />
          </div>
          <div>
            <p
              className={`text-center ${alertType === "normal" ? "text-[var(--clr-green)]" : "text-[var(--clr-scarlet)]"} text-[var(--clr-black-light)]`}
            >
              {`Are you sure you want to ${alertText}?`}
            </p>
          </div>
        </div>
      </AlertCardWrapper>
    );
  };

  const HandleForm = ({ type = "CREATE" }: { type: "CREATE" | "EDIT" }) => {
    return (
      <CardWrapper
        headerLabel={
          type === "CREATE" ? "Create New Sub Region" : "Update Sub Region"
        }
        // subHeaderLabel="Welcome back"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[260px] xs:w-[300px] sm:w-[340px]"
          >
            <div className="space-y-4">
              <>
                <FormField
                  control={form.control}
                  name="subregion_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub Region Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="eg. West Africa"
                          className={` bg-[var(--clr-silver-v6)] ${
                            form.formState.errors.subregion_name
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="continent_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Select Continent</FormLabel>
                      <FormControl>
                        <DropdownContinent
                          onChangeHandler={field.onChange}
                          value={field.value}
                          arrayData={continentData}
                          isError={
                            form.formState.errors.continent_id ? true : false
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            </div>
            <div className="!mb-4 !mt-6 !pt-4">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-[var(--clr-secondary)] "
              >
                {type === "CREATE" ? "Create" : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    );
  };

  const columns: TableColumn<Region>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "Sub-Region Name",
        minWidth: "200px",
        cell: (row: any) => row?.subregion_name,
      },
      {
        name: "Continent",
        minWidth: "200px",
        cell: (row: any) => row?.continent?.continent_name,
      },

      {
        name: "Status",
        width: "120px",
        // cell: (row: any) => row?.status,
        selector: (row: any) => (row?.status ? "Enabled" : "Disabled"),
        sortable: true,
        conditionalCellStyles: [
          {
            when: (row) => row?.status,
            style: {
              color: "green",
              "&:hover": {
                cursor: "pointer",
              },
            },
          },
          {
            when: (row) => !row?.status,
            style: {
              color: "red",
              "&:hover": {
                cursor: "pointer",
              },
            },
          },
        ],
      },
      {
        name: "Action",
        width: "140px",
        cell: (row) => (
          <div className="flex justify-center items-center">
            <div className="flex gap-6">
              {row.status ? (
                <ToolTip tooltip="Disable">
                  <AlertButton
                    asChild
                    Form={() =>
                      HandleConfirmPromt({
                        alertText: "disable this sub-region",
                        alertType: "danger",
                      })
                    }
                    isAlert={true}
                  >
                    <div>
                      <VscActivateBreakpoints
                        //   onClick={() => onDeactivateRole(row)}
                        className="text-red-600 text-xl cursor-pointer"
                      />
                    </div>
                  </AlertButton>
                </ToolTip>
              ) : (
                <ToolTip tooltip="Enable">
                  <AlertButton
                    asChild
                    Form={() =>
                      HandleConfirmPromt({
                        alertText: "enable this region",
                      })
                    }
                    isAlert={true}
                  >
                    <div>
                      <VscActivateBreakpoints
                        //   onClick={() => onDeactivateRole(row)}
                        className="text-green-600 text-xl cursor-pointer"
                      />
                    </div>
                  </AlertButton>
                </ToolTip>
              )}
              <div onClick={() => editSubRegion(row)}>
                <ToolTip tooltip="Edit Sub-Region">
                  <div>
                    <FiEdit className="text-xl font-black  cursor-pointer" />
                  </div>
                </ToolTip>
              </div>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const handleCloseButtonClickAddEdit = () => {
    setIsAddingSubRegion(false);
    setIsEditingSubRegion(false);
    setSingleId("");
  };

  const addSubRegion = () => {
    form.setValue("subregion_name", "");
    form.setValue("continent_id", "");
    setIsAddingSubRegion(true);
  };

  const editSubRegion = (subregion: any) => {
    form.setValue("subregion_name", subregion?.subregion_name);
    form.setValue("continent_id", subregion?.continent_id);
    setSingleId(subregion?.subreion_id);
    setIsEditingSubRegion(true);
  };

  const previewcolumns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "Sub-Region Name",
        minWidth: "200px",
        cell: (row: any) => row?.subregion_name,
      },
    ],
    []
  );

  const handleSelectedRoles = (row: any) => {
    if (row.selectedRows.length > 0) {
      setSelectedData(row.selectedRows);
    } else {
      setSelectedData([]);
    }
  };

  const onUpdateCSVDataHandler = (data: any) => {
    if (data) {
      console.log(data);
      setCsvData(data);
      setCsvFilteredData(data);
      setPreviewData(true);
    }
  };
  const handleCloseButtonClick = () => {
    setCsvData([]);
    setPreviewData(false);
    setSelectedData([]);
  };

  const handleClosePreviewButtonClick = () => {
    setSelectContinent(false);
  };

  const handleOpenPreviewButtonClick = () => {
    setSelectContinent(true);
  };

  const submitData = async (values: z.infer<typeof ContinentIDSchema>) => {
    if (selectedData.length > 0) {
      handleClosePreviewButtonClick();
      const newarray = await selectedData.map((obj: any) => ({
        ...obj,
        continent_id: values.continent_id,
      }));
      startTransition(() => {
        addbatchsubregion(newarray, locale)
          .then((data) => {
            // console.log(data);
            if (data?.error) {
              form.reset();
              // setError(data.error);
              toast({
                title: "Error",
                description: data.error,
                variant: "destructive",
              });
              // handleCloseButtonClick()
              // handleCloseButtonClick();
            }
            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              toast({
                title: "Success",
                description: data.success,
                variant: "default",
              });
              setFilteredData(data.data);
              // setIsPreviewSubmiting(false);
              handleCloseButtonClick();
            }
          })
          .catch(() => setError("Something went wrong"));
      });
    }
  };

  const HandlePreviewForm = () => {
    return (
      <CardWrapper
        headerLabel={"Select Continent"}
        // subHeaderLabel="Welcome back"
      >
        <Form {...form1}>
          <form
            onSubmit={form1.handleSubmit(submitData)}
            className="space-y-6 w-[260px] xs:w-[300px] sm:w-[340px]"
          >
            <div className="space-y-4">
              <>
                <FormField
                  control={form1.control}
                  name="continent_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      {/* <FormLabel>Select Continent</FormLabel> */}
                      <FormControl>
                        <DropdownContinent
                          onChangeHandler={field.onChange}
                          value={field.value}
                          arrayData={continentData}
                          isError={
                            form1.formState.errors.continent_id ? true : false
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            </div>
            <div className="!mb-4 !mt-6 !pt-4">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-[var(--clr-secondary)] "
              >
                Submit Data
              </Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    );
  };

  return (
    <>
      {selectContinent &&
        createPortal(
          <ModalForm closeModal={handleClosePreviewButtonClick}>
            <div>{HandlePreviewForm()}</div>
          </ModalForm>,
          document.body
        )}
      {isAddingSubRegion &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClickAddEdit}>
            <div>{HandleForm({ type: "CREATE" })}</div>
          </ModalForm>,
          document.body
        )}

      {isEditingSubRegion &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClickAddEdit}>
            <div>{HandleForm({ type: "EDIT" })}</div>
          </ModalForm>,
          document.body
        )}

      {previewData &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div className=" w-[320px] xs:w-[400px] xsm:w-[520px] sm:w-[600px] md:w-[720px] lg:w-[1000px] xl:w-[1200px] overflow-x-scroll">
              {isPending && (
                <div className="absolute left-0 top-0 bottom-0 right-0 flex w-full h-full items-center justify-center bg-transparent z-[10]">
                  <ImSpinner2 className="animate-spin h-12 w-12" />
                </div>
              )}
              <PreviewCardWrapper headerLabel={"Bulk Sub-Region Data"}>
                <div className="mt-5 flex justify-center">
                  <PreviewTable
                    extractedData={csvFilteredData}
                    columns={previewcolumns}
                    isLoading={isLoading}
                    submitData={submitData}
                    selectedData={selectedData}
                    handleSelectedRoles={handleSelectedRoles}
                    isForm={true}
                    handleOpenPreviewButtonClick={handleOpenPreviewButtonClick}
                  />
                </div>
              </PreviewCardWrapper>
            </div>
          </ModalForm>,
          document.body
        )}
      <div className={`flex-1 flex flex-col `}>
        <div className="fixed z-[20] bg-white w-full pb-2">
          <Breadcrump
            prePath={pathname.split("/")[1]}
            title={pathname.split("/")[2]}
          />
        </div>
        {/* <Card className="w-full mt-10 rounded-none border-none">
        <CardContent className="w-full "> */}
        <div className=" mt-20 flex justify-center ">
          <ModalTable
            filteredData={filteredData}
            columns={columns}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            report={report}
            reportFilename="Sub Regions"
            addButtonTitle="Add Sub Region"
            isAdd={true}
            addModal={addSubRegion}
            isBulk={true}
            template="/templates/sub-regions.csv"
            bulkUploadTitle="sub-regions.csv"
            onUpdateCSVDataHandler={onUpdateCSVDataHandler}
          />
        </div>
        {/* </CardContent>
      </Card> */}
      </div>
    </>
  );
}
