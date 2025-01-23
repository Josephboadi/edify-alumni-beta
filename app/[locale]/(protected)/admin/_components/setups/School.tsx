"use client";

import ToolTip from "@/components/common/ToolTip";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { VscActivateBreakpoints } from "react-icons/vsc";
import Breadcrump from "../common/Breadcrump";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

// import { CardWrapper } from "@/components/auth/card-wrapper";
import { getcountry } from "@/actions/country";
import {
  addbatchschool,
  addschool,
  getschool,
  updateschool,
} from "@/actions/school";
import DropdownRCountry from "@/components/common/DropdownRCountry";
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
import { SchoolSchema } from "@/schemas";
import { createPortal } from "react-dom";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { AlertButton } from "../common/alert-button";
import { AlertCardWrapper } from "../common/alert-card-wrapper";
import { CardWrapper } from "../common/card-wrapper";
import ModalTable from "../common/ModalTable";
import { PreviewCardWrapper } from "../common/preview-card-wrapper";
import PreviewTable from "../common/PreviewTable";
import { Country } from "./Country";

export type School = {
  id: string;
  school_id: string;
  school_name: string;
  address: string;
  phone_numbers: string[];
  date_created: string;
  status: boolean;
  country_id: string;
  country: Country;
};

export const CountryIDSchema = z.object({
  country_id: z.string().min(1, {
    message: "Country id is required",
  }),
});

export function SchoolDataTable() {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [dataList, setDataList] = useState<School[]>([]);
  const [filteredData, setFilteredData] = useState<School[]>([]);
  const [countryData, setCountryData] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const [report, setReport] = useState<any>([]);
  const { locale } = useParams();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isAddingSchool, setIsAddingSchool] = useState<boolean>(false);
  const [isEditingSchool, setIsEditingSchool] = useState<boolean>(false);
  const [singleId, setSingleId] = useState<string | undefined>("");

  const pq = searchParams.get("pq") ? searchParams.get("pq") : "";
  const [csvData, setCsvData] = useState<any>([]);
  const [csvFilteredData, setCsvFilteredData] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<School[]>([]);
  const [previewData, setPreviewData] = useState<boolean>(false);
  const [selectCountry, setSelectCountry] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SchoolSchema>>({
    resolver: zodResolver(SchoolSchema),
    defaultValues: {
      school_name: "",
      address: "",
      phone_numbers: [{ number: "" }],
      country_id: "",
    },
  });

  const control = form.control;

  const phoneNumberArray = useFieldArray({
    control,
    name: "phone_numbers",
  });

  const form1 = useForm<z.infer<typeof CountryIDSchema>>({
    resolver: zodResolver(CountryIDSchema),
    defaultValues: {
      country_id: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SchoolSchema>) => {
    setError("");
    setSuccess("");

    if (isAddingSchool) {
      startTransition(() => {
        addschool(values, locale)
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

    if (isEditingSchool) {
      startTransition(() => {
        updateschool(values, locale, singleId!)
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
      const data = await getschool();
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
      const data = await getcountry();
      if (data?.success) {
        setCountryData(data?.data);
        // setIsLoading(false);
      } else if (data?.error) {
        setCountryData([]);
        // setIsLoading(false);
        // setError(data?.error);
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      } else {
        setCountryData([]);
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
          ID: dat.school_id,
          "School Name": dat.school_name,
          Address: dat.address,
          "Phone Numbers": JSON.stringify(dat.phone_numbers),
          "Country Name": dat.country.country_name,
          "SubRegion Name": dat.country.subregion.subregion_name,
          "Continent Name": dat.country.subregion.continent.continent_name,
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
          data?.school_name.toLowerCase().includes(q.toLowerCase()) ||
          data?.address.toLowerCase().includes(q.toLowerCase()) ||
          data?.country.country_name.toLowerCase().includes(q.toLowerCase()) ||
          data?.country.subregion.subregion_name
            .toLowerCase()
            .includes(q.toLowerCase()) ||
          data?.country.subregion.continent.continent_name
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
        return data?.school_name.toLowerCase().includes(pq.toLowerCase());
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
        headerLabel={type === "CREATE" ? "Create New School" : "Update School"}
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
                  name="school_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="eg. De Youngsters Int. School"
                          className={` bg-[var(--clr-silver-v6)] ${
                            form.formState.errors.school_name
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="eg. Accra"
                          className={` bg-[var(--clr-silver-v6)] ${
                            form.formState.errors.address
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <p className="text-[0.9rem] font-medium mb-2">
                    Phone Numbers
                  </p>
                  <div className=" space-y-2">
                    {phoneNumberArray.fields.map((field, index) => {
                      const errorForField =
                        form.formState.errors?.phone_numbers?.[index]?.number;
                      return (
                        <div
                          key={field.number}
                          className="w-full flex flex-col"
                        >
                          <div className="flex flex-row items-end gap-2">
                            <div className="flex-1 !h-[38px] ">
                              <input
                                {...form.register(
                                  `phone_numbers.${index}.number` as const
                                )}
                                placeholder="eg. 0554788874"
                                defaultValue={field.number}
                                className={`flex rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-full w-full bg-[var(--clr-silver-v6)] ${
                                  errorForField
                                    ? "border border-red-500 focus-visible:ring-0"
                                    : "focus-visible:ring-transparent border-none"
                                }`}
                              />
                            </div>

                            <ToolTip tooltip="Remove">
                              <Button
                                size={"icon"}
                                variant={"ghost"}
                                asChild
                                className="  w-5 h-5 shadow-lg  mb-1 flex items-center justify-center"
                              >
                                <FaTrashAlt
                                  onClick={() => phoneNumberArray.remove(index)}
                                  className="text-sm text-[var(--clr-scarlet)]"
                                />
                              </Button>
                            </ToolTip>
                          </div>
                          {errorForField?.message && (
                            <p>{errorForField?.message ?? <>&nbsp;</>}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <p>{form.formState.errors.phone_numbers?.message}</p>
                  <div className="flex w-full justify-end mt-3 pr-7">
                    <Button
                      // size={""}
                      size={"sm"}
                      variant={"outline"}
                      asChild
                      className="shadow-none  flex items-center justify-center rounded-[4px] border-[var(--clr-secondary)]"
                    >
                      <p
                        className="gap-2"
                        onClick={() => {
                          phoneNumberArray.append({ number: "" });
                          form.trigger("phone_numbers");
                        }}
                      >
                        <HiOutlinePlus className="text-lg text-[var(--clr-secondary)]" />
                        <span>Add New Phone Number</span>
                      </p>
                    </Button>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="country_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Select Country</FormLabel>
                      <FormControl>
                        <DropdownRCountry
                          onChangeHandler={field.onChange}
                          value={field.value}
                          arrayData={countryData}
                          isError={
                            form.formState.errors.country_id ? true : false
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

  const columns: TableColumn<School>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "School Name",
        minWidth: "200px",
        cell: (row: any) => row?.school_name,
      },
      {
        name: "School Address",
        minWidth: "200px",
        cell: (row: any) => row?.address,
      },
      {
        name: "Phone Numbers",
        minWidth: "200px",
        cell: (row: any) =>
          row?.phone_numbers.map((number: any) => `${number}, `),
      },
      {
        name: "Country",
        width: "200px",
        cell: (row: any) => row?.country?.country_name,
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
              <div onClick={() => editSchool(row)}>
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
    setIsAddingSchool(false);
    setIsEditingSchool(false);
    setSingleId("");
  };

  const addSchool = () => {
    //  form.setValue("school_name", "");
    //  form.setValue("address", "");
    //  form.setValue("country_id", "");
    form.reset();
    setIsAddingSchool(true);
  };

  const editSchool = async (school: any) => {
    let newcontactarray: any = [];
    await school?.phone_numbers.map((number: any) => {
      newcontactarray.push({ number: number });
    });
    form.setValue("school_name", school?.school_name);
    form.setValue("address", school?.address);
    form.setValue("country_id", school?.country_id);
    form.setValue("phone_numbers", [...newcontactarray]);

    setSingleId(school?.country_id);
    setIsEditingSchool(true);
  };

  const previewcolumns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "school_name",
        minWidth: "200px",
        cell: (row: any) => row?.school_name,
      },
      {
        name: "phone_numbers",
        minWidth: "200px",
        cell: (row: any) => row?.phone_numbers,
      },
      {
        name: "address",
        minWidth: "200px",
        cell: (row: any) => row?.address,
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
    setSelectCountry(false);
  };

  const handleOpenPreviewButtonClick = () => {
    setSelectCountry(true);
  };

  const submitData = async (values: z.infer<typeof CountryIDSchema>) => {
    if (selectedData.length > 0) {
      handleClosePreviewButtonClick();
      const newarray = await selectedData.map((obj: any) => ({
        school_name: obj.school_name,
        address: obj.address,
        phone_numbers: JSON.parse(obj.phone_numbers),
        country_id: values.country_id,
      }));

      console.log(newarray);
      startTransition(() => {
        addbatchschool(newarray, locale)
          .then((data) => {
            console.log(data);
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
        headerLabel={"Select Country"}
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
                  name="country_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      {/* <FormLabel>Select Country</FormLabel> */}
                      <FormControl>
                        <DropdownRCountry
                          onChangeHandler={field.onChange}
                          value={field.value}
                          arrayData={countryData}
                          isError={
                            form1.formState.errors.country_id ? true : false
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
      {selectCountry &&
        createPortal(
          <ModalForm closeModal={handleClosePreviewButtonClick}>
            <div>{HandlePreviewForm()}</div>
          </ModalForm>,
          document.body
        )}
      {isAddingSchool &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClickAddEdit}>
            <div>{HandleForm({ type: "CREATE" })}</div>
          </ModalForm>,
          document.body
        )}

      {isEditingSchool &&
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
              <PreviewCardWrapper headerLabel={"Bulk School Data"}>
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
            reportFilename="Schools"
            addButtonTitle="Add School"
            isAdd={true}
            addModal={addSchool}
            isBulk={true}
            template="/templates/schools.csv"
            bulkUploadTitle="schools.csv"
            onUpdateCSVDataHandler={onUpdateCSVDataHandler}
          />
        </div>
        {/* </CardContent>
      </Card> */}
      </div>
    </>
  );
}
