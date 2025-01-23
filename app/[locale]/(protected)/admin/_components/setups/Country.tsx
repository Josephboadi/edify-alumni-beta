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
import { addbatchcountry, addcountry, updatecountry } from "@/actions/country";
import { getsubregion } from "@/actions/sub-region";
import DropdownSubRegion from "@/components/common/DropdownSubRegion";
import ModalForm from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { CountrySchema } from "@/schemas";
import { createPortal } from "react-dom";
import { ImSpinner2 } from "react-icons/im";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { AlertButton } from "../common/alert-button";
import { AlertCardWrapper } from "../common/alert-card-wrapper";
import { CardWrapper } from "../common/card-wrapper";
import ModalTable from "../common/ModalTable";
import { PreviewCardWrapper } from "../common/preview-card-wrapper";
import PreviewTable from "../common/PreviewTable";
import { Region } from "./Region";

export type Country = {
  id: string;
  country_id: string;
  country_name: string;
  country_code: string;
  date_created: string;
  status: boolean;
  is_edify_country: boolean;
  subreion_id: string;
  subregion: Region;
};

export const SubRegionIDSchema = z.object({
  subreion_id: z.string().min(1, {
    message: "Sub-Region id is required",
  }),
});

export function CountryDataTable({ countryDataQuery }: any) {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [dataList, setDataList] = useState<Country[]>([]);
  const [filteredData, setFilteredData] = useState<Country[]>([]);
  const [subRegionData, setSubRegionData] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const [report, setReport] = useState<any>([]);
  const { locale } = useParams();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isAddingCountry, setIsAddingCountry] = useState<boolean>(false);
  const [isEditingCountry, setIsEditingCountry] = useState<boolean>(false);
  const [singleId, setSingleId] = useState<string | undefined>("");

  const pq = searchParams.get("pq") ? searchParams.get("pq") : "";
  const [csvData, setCsvData] = useState<any>([]);
  const [csvFilteredData, setCsvFilteredData] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<Country[]>([]);
  const [previewData, setPreviewData] = useState<boolean>(false);
  const [selectSubRegion, setSelectSubRegion] = useState<boolean>(false);

  const form = useForm<z.infer<typeof CountrySchema>>({
    resolver: zodResolver(CountrySchema),
    defaultValues: {
      country_name: "",
      country_code: "",
      subreion_id: "",
      is_edify_country: true,
    },
  });

  const form1 = useForm<z.infer<typeof SubRegionIDSchema>>({
    resolver: zodResolver(SubRegionIDSchema),
    defaultValues: {
      subreion_id: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CountrySchema>) => {
    setError("");
    setSuccess("");

    if (isAddingCountry) {
      startTransition(() => {
        addcountry(values, locale)
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

    if (isEditingCountry) {
      startTransition(() => {
        updatecountry(values, locale, singleId!)
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
      // const data = await getcountry();
      if (countryDataQuery?.success) {
        setDataList(countryDataQuery?.data);
        setIsLoading(false);
      } else if (countryDataQuery?.error) {
        setDataList([]);
        setIsLoading(false);
        // setError(countryDataQuery?.error);
        toast({
          title: "Error",
          description: countryDataQuery.error,
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
      const data = await getsubregion();
      if (data?.success) {
        setSubRegionData(data?.data);
        // setIsLoading(false);
      } else if (data?.error) {
        setSubRegionData([]);
        // setIsLoading(false);
        // setError(data?.error);
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      } else {
        setSubRegionData([]);
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
          ID: dat.country_id,
          "Country Name": dat.country_name,
          "Country Code": dat.country_code,
          "SubRegion Name": dat.subregion.subregion_name,
          "Continent Name": dat.subregion.continent.continent_name,
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
          data?.country_name.toLowerCase().includes(q.toLowerCase()) ||
          data?.country_code.toLowerCase().includes(q.toLowerCase()) ||
          data?.subregion.subregion_name
            .toLowerCase()
            .includes(q.toLowerCase()) ||
          data?.subregion.continent.continent_name
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
        return data?.country_name.toLowerCase().includes(pq.toLowerCase());
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
          type === "CREATE" ? "Create New Country" : "Update Country"
        }
        // subHeaderLabel="Welcome back"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[260px] xs:w-[300px] sm:w-[340px]"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="country_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="eg. Ghana"
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.country_name
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
                name="country_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="eg. GHA"
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.country_code
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
                name="subreion_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Select Sub Region</FormLabel>
                    <FormControl>
                      <DropdownSubRegion
                        onChangeHandler={field.onChange}
                        value={field.value}
                        arrayData={subRegionData}
                        isError={
                          form.formState.errors.subreion_id ? true : false
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_edify_country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center flex-row-reverse">
                        <label
                          htmlFor="is_edify_country"
                          className="flex-1 pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Is Edify Country
                        </label>
                        <Checkbox
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          id="is_edify_country"
                          className="mr-2 h-5 w-5 border-2 border-primary-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

  const columns: TableColumn<Country>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "Country Name",
        minWidth: "200px",
        cell: (row: any) => row?.country_name,
      },
      {
        name: "Country Code",
        minWidth: "200px",
        cell: (row: any) => row?.country_code,
      },
      {
        name: "Sub Region",
        minWidth: "200px",
        cell: (row: any) => row?.subregion?.subregion_name,
      },
      {
        name: "Continent",
        minWidth: "200px",
        cell: (row: any) => row?.subregion?.continent?.continent_name,
      },
      {
        name: "Is Edify Country",
        width: "120px",
        // cell: (row: any) => row?.status,
        selector: (row: any) => (row?.is_edify_country ? "Yes" : "No"),
        sortable: true,
        conditionalCellStyles: [
          {
            when: (row) => row?.is_edify_country,
            style: {
              color: "green",
              "&:hover": {
                cursor: "pointer",
              },
            },
          },
          {
            when: (row) => !row?.is_edify_country,
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
              <div onClick={() => editCountry(row)}>
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
    setIsAddingCountry(false);
    setIsEditingCountry(false);
    setSingleId("");
  };

  const addCountry = () => {
    form.reset();
    setIsAddingCountry(true);
  };

  const editCountry = (country: any) => {
    form.setValue("country_name", country?.country_name);
    form.setValue("country_code", country?.country_code);
    form.setValue("subreion_id", country?.subreion_id);
    form.setValue("is_edify_country", country?.is_edify_country);

    setSingleId(country?.country_id);
    setIsEditingCountry(true);
  };

  const previewcolumns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "country_name",
        minWidth: "200px",
        cell: (row: any) => row?.country_name,
      },
      {
        name: "country_code",
        width: "200px",
        cell: (row: any) => row?.country_code,
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
    setSelectSubRegion(false);
  };

  const handleOpenPreviewButtonClick = () => {
    setSelectSubRegion(true);
  };

  const submitData = async (values: z.infer<typeof SubRegionIDSchema>) => {
    if (selectedData.length > 0) {
      handleClosePreviewButtonClick();
      const newarray = await selectedData.map((obj: any) => ({
        ...obj,
        subreion_id: values.subreion_id,
      }));
      startTransition(() => {
        addbatchcountry(newarray, locale)
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
        headerLabel={"Select Sub-Region"}
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
                  name="subreion_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      {/* <FormLabel>Select Sub Region</FormLabel> */}
                      <FormControl>
                        <DropdownSubRegion
                          onChangeHandler={field.onChange}
                          value={field.value}
                          arrayData={subRegionData}
                          isError={
                            form1.formState.errors.subreion_id ? true : false
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
      {selectSubRegion &&
        createPortal(
          <ModalForm closeModal={handleClosePreviewButtonClick}>
            <div>{HandlePreviewForm()}</div>
          </ModalForm>,
          document.body
        )}
      {isAddingCountry &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClickAddEdit}>
            <div>{HandleForm({ type: "CREATE" })}</div>
          </ModalForm>,
          document.body
        )}

      {isEditingCountry &&
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
              <PreviewCardWrapper headerLabel={"Bulk Country Data"}>
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
      <div className={`flex-1 flex flex-col  `}>
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
            reportFilename="Countries"
            addButtonTitle="Add Country"
            isAdd={true}
            addModal={addCountry}
            isBulk={true}
            template="/templates/countries.csv"
            bulkUploadTitle="countries.csv"
            onUpdateCSVDataHandler={onUpdateCSVDataHandler}
          />
        </div>
        {/* </CardContent>
      </Card> */}
      </div>
    </>
  );
}
