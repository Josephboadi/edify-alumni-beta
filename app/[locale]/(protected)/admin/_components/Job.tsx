"use client";

import ToolTip from "@/components/common/ToolTip";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import Breadcrump from "./common/Breadcrump";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

// import { CardWrapper } from "@/components/auth/card-wrapper";
import { getcountry } from "@/actions/country";
import { addjob, updatejob } from "@/actions/jobs";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { JobInfoData, NewJobFormSchema } from "@/schemas";
import Link from "next/link";
import { createPortal } from "react-dom";
import { CiViewList } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { AlertCardWrapper } from "./common/alert-card-wrapper";
import { CardWrapper } from "./common/card-wrapper";
import DropdownJobCat from "./common/DropdownCategory";
import DropdownCurrency from "./common/DropdownCurrency";
import DropdownJobType from "./common/DropdownType";
import ModalTable from "./common/ModalTable";
import { Country } from "./setups/Country";

// jobDescription: z.array(z.object({ info: z.string() })),
// jobSpecification: z.array(z.object({ info: z.string() })),

// type JobDescription = {
//   id: number;
//   info: string;
// };

// type JobSpecification = {
//   id: number;
//   info: string;
// };

type JobPost = z.infer<typeof NewJobFormSchema>;
type NewJobFormValues = z.infer<typeof NewJobFormSchema>;

export function JobDataTable({ jobQueryData }: any) {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [dataList, setDataList] = useState<JobInfoData[]>([]);
  const [filteredData, setFilteredData] = useState<JobInfoData[]>([]);
  const [countryData, setCountryData] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isAddingJob, setIsAddingJob] = useState<boolean>(false);
  const [isEditingJob, setIsEditingJob] = useState<boolean>(false);
  const { locale } = useParams();
  const [report, setReport] = useState<any>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [singleId, setSingleId] = useState<string | undefined>("");

  const pq = searchParams.get("pq") ? searchParams.get("pq") : "";

  // const defaultValues: z.infer<typeof NewJobFormSchema> = {
  //   jobTitle: "",
  //   jobCategory: "",
  //   jobType: "",
  //   country_id: "",
  //   minimumSalary: 0,
  //   maximumSalary: 0,
  //   location: "",
  //   infomation: "",
  //   salaryCurrency: "",
  //   description: [""],
  //   sepcification: [""],
  // };

  const form = useForm<NewJobFormValues>({
    defaultValues: {
      jobTitle: "",
      jobCategory: "",
      jobType: "",
      country_id: "",
      minimumSalary: 0,
      maximumSalary: 0,
      location: "",
      infomation: "",
      salaryCurrency: "",
      description: [""],
      sepcification: [""],
    },
    resolver: zodResolver(NewJobFormSchema),
  });

  // {
  //   fields, append, prepend, remove;
  // }

  const jobSpecificationArray = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "sepcification",
    rules: {
      required: "Please append at least 1 Job Specification",
    },
  });

  const jobDescriptionArray = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "description",
    rules: {
      required: "Please append at least 1 Job Description",
    },
  });

  const onSubmit = (values: z.infer<typeof NewJobFormSchema>) => {
    setError("");
    setSuccess("");

    // console.log(values);

    if (isAddingJob) {
      startTransition(() => {
        addjob(values, locale)
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

    if (isEditingJob) {
      startTransition(() => {
        updatejob(values, locale, singleId!)
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
      // const data = await getjobs();
      if (jobQueryData) {
        if (jobQueryData?.success) {
          setDataList(jobQueryData?.data);
          setIsLoading(false);
        } else if (jobQueryData?.error) {
          setDataList([]);
          setIsLoading(false);
          // setError(jobQueryData?.error);
          toast({
            title: "Error",
            description: jobQueryData.error,
            variant: "destructive",
          });
        } else {
          setDataList([]);
          setIsLoading(false);
        }
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

      const rep: any = dataList?.map((dat: JobInfoData) => {
        return {
          ID: dat.id,
          Title: dat.jobTitle,
          Category: dat.jobCategory,
          JobType: dat.jobType,
          "Minimum Salary": dat.minimumSalary,
          "Maximum Salary": dat.maximumSalary,
          Location: dat.location,
          Country: dat.country.country_name,
          // "Published Date": dat.publishDate,
          Information: dat.infomation,
          // "Job Specification": JSON.stringify(dat.jobSpecification),
          // "Job Description": JSON.stringify(dat.jobDescription),
        };
      });
      setReport(rep);
    };
    getData();
  }, [dataList]);

  useEffect(() => {
    let result = dataList;
    if (q && q.length > 3) {
      result = dataList.filter((data: JobInfoData) => {
        return (
          data?.jobTitle.toLowerCase().includes(q.toLowerCase()) ||
          data?.jobCategory.toLowerCase().includes(q.toLowerCase()) ||
          data?.jobType.toLowerCase().includes(q.toLowerCase()) ||
          // data?.pay.toString().includes(q.toString()) ||
          data?.country?.country_name.toLowerCase().includes(q.toLowerCase()) ||
          data?.infomation.toLowerCase().includes(q.toLowerCase()) ||
          data?.location.toLowerCase().includes(q.toLowerCase())
        );
      });
    }
    setFilteredData(result);
  }, [q]);

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
        headerLabel={type === "CREATE" ? "Create New Job" : "Update Job"}
        // subHeaderLabel="Welcome back"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[260px] xs:w-[300px] sm:w-[340px] md:w-[700px] "
          >
            <div className="md:w-[700px] grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="eg. Infomation Security"
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.jobTitle
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
                name="jobCategory"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Select Job Category</FormLabel>
                    <FormControl>
                      <DropdownJobCat
                        onChangeHandler={field.onChange}
                        value={field.value}
                        isError={
                          form.formState.errors.jobCategory ? true : false
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Select Job Type</FormLabel>
                    <FormControl>
                      <DropdownJobType
                        onChangeHandler={field.onChange}
                        value={field.value}
                        isError={form.formState.errors.jobType ? true : false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Location</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="eg. Accra"
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.location
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
                name="minimumSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Salary</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))} // Convert value to number
                        disabled={isPending}
                        placeholder="eg. Ghs 100"
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.minimumSalary
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
                name="maximumSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Salary</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))} // Convert value to number
                        disabled={isPending}
                        placeholder="eg. Ghs 2000"
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.maximumSalary
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

              <FormField
                control={form.control}
                name="salaryCurrency"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Select Currency</FormLabel>
                    <FormControl>
                      <DropdownCurrency
                        onChangeHandler={field.onChange}
                        value={field.value}
                        isError={
                          form.formState.errors.salaryCurrency ? true : false
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="infomation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brief Information</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="Enter a brief information about job."
                          className={`rounded-[6px]  !min-h-[100px] !max-h-[10vh] bg-[var(--clr-silver-v6)] placeholder:text-left ${
                            form.formState.errors.infomation
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <p className="text-[0.9rem] font-medium mb-2">
                  Job Descriptions
                </p>
                <div className=" space-y-2">
                  {jobDescriptionArray.fields.map((field, index) => {
                    const errorForField =
                      form.formState.errors?.description?.[index];
                    return (
                      <div key={field.id} className="w-full flex flex-col">
                        <div className="flex flex-row items-end gap-2">
                          <div className="flex-1 !min-h-[60px] !h-[60px] !max-h-[60px] ">
                            <textarea
                              {...form.register(
                                `description.${index}` as const
                              )}
                              placeholder="Enter job description..."
                              defaultValue={field.id}
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
                              className="  w-5 h-5 shadow-lg  flex items-center justify-center"
                            >
                              <FaTrashAlt
                                onClick={() =>
                                  jobDescriptionArray.remove(index)
                                }
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

                <p>{form.formState.errors.description?.message}</p>
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
                        jobDescriptionArray.append("");
                        form.trigger("description");
                      }}
                    >
                      <HiOutlinePlus className="text-lg text-[var(--clr-secondary)]" />
                      <span>Add New Job Description</span>
                    </p>
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-[0.9rem] font-medium mb-2">
                  Job Specifications
                </p>
                <div className=" space-y-2">
                  {jobSpecificationArray.fields.map((field, index) => {
                    const errorForField =
                      form.formState.errors?.sepcification?.[index];
                    return (
                      <div key={field.id} className="w-full flex flex-col">
                        <div className="flex flex-row items-end gap-2">
                          <div className="flex-1 !min-h-[60px] !h-[60px] !max-h-[60px] ">
                            <textarea
                              {...form.register(
                                `sepcification.${index}` as const
                              )}
                              placeholder="Enter job specification..."
                              defaultValue={field.id}
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
                              className="  w-5 h-5 shadow-lg  flex items-center justify-center"
                            >
                              <FaTrashAlt
                                onClick={() =>
                                  jobSpecificationArray.remove(index)
                                }
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

                <p>{form.formState.errors.sepcification?.message}</p>
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
                        jobSpecificationArray.append("");
                        form.trigger("sepcification");
                      }}
                    >
                      <HiOutlinePlus className="text-lg text-[var(--clr-secondary)]" />
                      <span>Add New Job Specification</span>
                    </p>
                  </Button>
                </div>
              </div>
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

  const columns: TableColumn<JobInfoData>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "Title",
        minWidth: "200px",
        cell: (row: any) => row?.jobTitle,
      },
      {
        name: "Information",
        minWidth: "500px",
        cell: (row: any) => row?.infomation,
      },
      {
        name: "Job Category",
        width: "200px",
        cell: (row: any) => row?.jobCategory,
      },

      {
        name: "Job Type",
        width: "150px",
        cell: (row: any) => row?.jobType,
      },
      {
        name: "Minimum Salary",
        width: "150px",
        cell: (row: any) => row?.minimumSalary,
      },

      {
        name: "Maximum Salary",
        width: "150px",
        cell: (row: any) => row?.maximumSalary,
      },

      {
        name: "Location",
        minWidth: "200px",
        cell: (row: any) => row?.location,
      },
      {
        name: "Country",
        minWidth: "200px",
        cell: (row: any) => row?.country.country_name,
      },
      {
        name: "Total Application(s)",
        width: "150px",
        cell: (row: any) => row?.numberOfApplication,
      },
      {
        name: "Confirmed Application(s)",
        width: "150px",
        cell: (row: any) => row?.numberOfConfirmation,
      },
      {
        name: "Pending Application(s)",
        width: "150px",
        cell: (row: any) => row?.numberOfPending,
      },
      {
        name: "Denied Application(s)",
        width: "150px",
        cell: (row: any) => row?.numberOfDeclined,
      },

      {
        name: "Status",
        // width: "120px",
        // cell: (row: any) => "Enabled",
        selector: (row) => (row?.status == 1 ? "Active" : "Inactive"),
        sortable: true,
        conditionalCellStyles: [
          {
            when: (row) => row?.status == 1,
            style: {
              color: "green",
              "&:hover": {
                cursor: "pointer",
              },
            },
          },
          {
            when: (row) => row?.status == 0,
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
              <Link
                href={
                  locale === "en"
                    ? `/admin/job/${row.job_id}`
                    : `/${locale}/admin/job/${row.job_id}`
                }
              >
                <ToolTip tooltip="View Job Applications">
                  <CiViewList className="text-xl font-black  cursor-pointer" />
                </ToolTip>
              </Link>
              <div onClick={() => editJob(row)}>
                <ToolTip tooltip="Edit Job">
                  {/* <FormButton
                    asChild
                    Form={() => HandleForm({ type: "EDIT", single: row })}
                  > */}
                  <div>
                    <FiEdit
                      //   onClick={() => editWallet(row)}
                      className="text-xl font-black  cursor-pointer"
                    />
                  </div>
                  {/* </FormButton> */}
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
    setIsAddingJob(false);
    setIsEditingJob(false);
    setSingleId("");
  };

  const handleCloseButtonClick = () => {
    // console.log("Close button Clicked");
    setIsAddingJob(false);
    setIsEditingJob(false);
  };

  const addJob = () => {
    form.reset();

    setIsAddingJob(true);
  };

  const editJob = (job: any) => {
    form.setValue("description", [...job?.description]);
    form.setValue("sepcification", [...job?.sepcification]);
    // setSingleData(job);
    form.setValue("jobTitle", job?.jobTitle);
    form.setValue("jobCategory", job?.jobCategory);
    form.setValue("jobType", job?.jobType);
    form.setValue("minimumSalary", Number(job?.minimumSalary));
    form.setValue("maximumSalary", Number(job?.maximumSalary));
    form.setValue("location", job?.location);
    form.setValue("infomation", job?.infomation);
    form.setValue("salaryCurrency", job?.salaryCurrency);
    form.setValue("country_id", job?.country_id);

    setSingleId(job?.job_id);

    setIsEditingJob(true);
  };

  return (
    <>
      {isAddingJob &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{HandleForm({ type: "CREATE" })}</div>
          </ModalForm>,
          document.body
        )}

      {isEditingJob &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{HandleForm({ type: "EDIT" })}</div>
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
            reportFilename="Jobs"
            addButtonTitle="Add New Job"
            isAdd={true}
            addModal={addJob}
          />
        </div>
        {/* </CardContent>
      </Card> */}
      </div>
    </>
  );
}
