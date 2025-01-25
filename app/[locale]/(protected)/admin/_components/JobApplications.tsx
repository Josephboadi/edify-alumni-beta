"use client";

import ToolTip from "@/components/common/ToolTip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import * as z from "zod";
import Breadcrump from "./common/Breadcrump";

// import { CardWrapper } from "@/components/auth/card-wrapper";
import { processjobapplication } from "@/actions/jobs";
import ModalForm from "@/components/common/Modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  JobApplicationsData,
  JobInfoData,
  ProcessJobFormSchema,
} from "@/schemas";
import Image from "next/image";
import { createPortal } from "react-dom";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { AlertCardWrapper } from "./common/alert-card-wrapper";
import { CardWrapper } from "./common/card-wrapper";
import DropdownStatus from "./common/DropdownStatus";
import { FormButton } from "./common/form-button";
import { ImageWrapper } from "./common/image-wrapper";
import ModalTable from "./common/ModalTable";

import { Montserrat, Montserrat_Alternates } from "next/font/google";
import Link from "next/link";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const font = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const font1 = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});
type JobPost = z.infer<typeof ProcessJobFormSchema>;

export function JobApplications({ jobDetailQueryData }: any) {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [dataList, setDataList] = useState<JobApplicationsData[]>([]);
  const [filteredData, setFilteredData] = useState<JobApplicationsData[]>([]);
  const [jobDetailsData, setJobDetailsData] = useState<JobInfoData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isAddingJob, setIsAddingJob] = useState<boolean>(false);
  const [isEditingJob, setIsEditingJob] = useState<boolean>(false);
  const { locale, id } = useParams();
  const [report, setReport] = useState<any>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [singleId, setSingleId] = useState<string | undefined>("");
  //   const [paramId, setParamId] = useState<string | undefined>(id && id.toString());

  const pq = searchParams.get("pq") ? searchParams.get("pq") : "";

  const form = useForm<z.infer<typeof ProcessJobFormSchema>>({
    defaultValues: {
      application_id: "",
      status: 0,
      processComment: "",
    },
    resolver: zodResolver(ProcessJobFormSchema),
  });

  const onSubmit = (values: z.infer<typeof ProcessJobFormSchema>) => {
    setError("");
    setSuccess("");

    // console.log(values);

    startTransition(() => {
      processjobapplication(values, locale)
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
            setIsEditingJob(false);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data?.data);
            toast({
              title: "Success",
              description: data.success,
              variant: "default",
            });
            setDataList(data?.data?.applications);
            setIsEditingJob(false);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      // const data = await getsinglejob(id ? id.toString() : "");
      if (jobDetailQueryData) {
        if (jobDetailQueryData?.success) {
          setDataList(jobDetailQueryData?.data?.applications);
          setJobDetailsData(jobDetailQueryData?.data);
          setIsLoading(false);
        } else if (jobDetailQueryData?.error) {
          setDataList([]);
          setJobDetailsData(undefined);
          setIsLoading(false);
          // setError(jobDetailQueryData?.error);
          toast({
            title: "Error",
            description: jobDetailQueryData.error,
            variant: "destructive",
          });
        } else {
          setDataList([]);
          setJobDetailsData(undefined);
          setIsLoading(false);
        }
      } else {
        setDataList([]);
        setJobDetailsData(undefined);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setFilteredData(dataList);

      const rep: any = dataList?.map((dat: JobApplicationsData) => {
        return {
          ID: dat.id,
          Applicant: dat.user.name,
          Resume: dat.cvUrl,
          "Cover Letter": dat.coverPageUrl,
          "Phone Number": dat.user.phone_numbers,
          Email: dat.user.email,
          Address: dat.user.address,
          status: dat.status,
        };
      });
      setReport(rep);
    };
    getData();
  }, [dataList]);

  useEffect(() => {
    let result = dataList;
    if (q && q.length > 3) {
      result = dataList.filter((data: JobApplicationsData) => {
        return (
          data?.user?.name.toLowerCase().includes(q.toLowerCase()) ||
          data?.user?.email.toLowerCase().includes(q.toLowerCase()) ||
          data?.user?.phone_numbers.toLowerCase().includes(q.toLowerCase())
          //     ||
          //   data?.user?.address.toLowerCase().includes(q.toLowerCase())
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
        headerLabel={
          type === "CREATE" ? "Create New Job" : "Process Application"
        }
        // subHeaderLabel="Welcome back"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[260px] xs:w-[300px] sm:w-[340px] "
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="application_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={true}
                        placeholder="eg. Infomation Security"
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.application_id
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
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Select Application Status</FormLabel>
                    <FormControl>
                      <DropdownStatus
                        onChangeHandler={field.onChange}
                        value={field.value}
                        isError={form.formState.errors.status ? true : false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full">
                <FormField
                  control={form.control}
                  name="processComment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter a Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="Enter a brief information about job."
                          className={`rounded-[6px]  !min-h-[100px] !max-h-[10vh] bg-[var(--clr-silver-v6)] placeholder:text-left ${
                            form.formState.errors.processComment
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
            </div>
            <div className="!mb-4 !mt-6 !pt-4">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-[var(--clr-secondary)] "
              >
                {type === "CREATE" ? "Create" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    );
  };

  const HandleImagePreview = ({
    singleData,
  }: {
    singleData?: JobApplicationsData;
  }) => {
    return (
      <ImageWrapper
      // subHeaderLabel="Welcome back"
      >
        <div className="relative w-[260px] xs:w-[300px] sm:w-[340px] h-[260px] xs:h-[300px] sm:h-[340px] flex items-center justify-center !rounded-xl">
          {singleData?.user?.image ? (
            <Image
              src={singleData?.user?.image}
              alt="-"
              fill
              className="object-cover object-center !rounded-xl"
            />
          ) : (
            <div className="bg-[var(--clr-secondary)] text-[var(--clr-primary)] flex items-center justify-center w-full h-full">
              <h1 className="text-4xl font-bold">
                {singleData?.user?.name?.split("")?.shift()?.toUpperCase()}
              </h1>
            </div>
          )}
        </div>
      </ImageWrapper>
    );
  };

  const columns: TableColumn<JobApplicationsData>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "Applicant Name",
        minWidth: "200px",
        cell: (row: any) => row?.user?.name,
      },
      {
        name: "Cover Image",
        width: "120px",
        cell: (row: any) => (
          <FormButton
            asChild
            Form={() => HandleImagePreview({ singleData: row })}
          >
            <div className="cursor-pointer py-2">
              <Avatar className="w-[45px] h-[45px] relative">
                <AvatarImage src={row?.user?.name || ""} />
                <AvatarFallback className="bg-[var(--clr-secondary)] text-[var(--clr-primary)]">
                  {row?.user?.name?.split("")?.shift()?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </FormButton>
        ),
      },
      {
        name: "Applicant CV",
        width: "120px",
        cell: (row: any) =>
          row?.cvUrl && (
            <Button variant={"ghost"} asChild className=" px-0 py-2">
              <a target="_blank" href={row?.cvUrl}>
                <BsFileEarmarkPdf className="text-4xl font-black  cursor-pointer" />
              </a>
            </Button>
          ),
      },

      {
        name: "Cover Letter",
        width: "120px",
        cell: (row: any) =>
          row?.coverPageUrl && (
            <Button variant={"ghost"} asChild className=" px-0 py-2">
              <a target="_blank" href={row?.coverPageUrl}>
                <BsFileEarmarkPdf className="text-4xl font-black  cursor-pointer" />
              </a>
            </Button>
          ),
      },
      {
        name: "Email",
        width: "250px",
        cell: (row: any) => row?.user?.email,
      },

      {
        name: "Address",
        minWidth: "200px",
        cell: (row: any) => row?.user?.address,
      },
      {
        name: "Comment",
        minWidth: "200px",
        cell: (row: any) => row?.processComment,
      },
      {
        name: "Status",
        // width: "120px",
        // cell: (row: any) => "Enabled",
        selector: (row) =>
          row?.status == 1
            ? "Approved"
            : row?.status == 2
              ? "Pending"
              : "Declined",
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
            when: (row) => row?.status == 2,
            style: {
              color: "blue",
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
              <div onClick={() => processApplication(row)}>
                <ToolTip tooltip="Process Application">
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

  const handleCloseButtonClick = () => {
    // console.log("Close button Clicked");
    setIsAddingJob(false);
    setIsEditingJob(false);
  };

  //   const addJob = () => {
  //     form.reset();

  //     setIsAddingJob(true);
  //   };

  const processApplication = (job: any) => {
    form.setValue("application_id", job?.application_id);
    form.setValue("status", job?.status);

    setIsEditingJob(true);
  };

  return (
    <>
      {/* {isAddingJob &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{HandleForm({ type: "CREATE" })}</div>
          </ModalForm>,
          document.body
        )} */}

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
            prePath={`${pathname.split("/")[1]} / ${pathname.split("/")[2]}`}
            title={"applications"}
          />

          <div>
            <Button
              variant={"ghost"}
              size={"icon"}
              asChild
              className="bg-[var(--clr-silver-v6)] rounded-[6px]"
            >
              <Link
                href={locale === "en" ? `/admin/job` : `/${locale}/admin/job`}
              >
                <MdOutlineArrowBackIosNew className="text-xl text-[var(--clr-secondary)]" />
              </Link>
            </Button>
          </div>
        </div>

        <div className=" w-full mt-[90px] !mb-5">
          {isLoading && (
            <section className=" !w-full  pb-5 flex flex-col gap-4">
              <Skeleton className=" w-full shadow-md !px-0 pt-3 h-[180px]  !rounded-[9px] border-none" />
            </section>
          )}
          {!isLoading && jobDetailsData && (
            <section className=" w-full  pb-5 flex flex-col gap-4">
              <div className="">
                <Card className=" w-full shadow-md !px-0 pt-3  !rounded-[9px] !border-[1px]">
                  <CardContent className="relative w-full px-3 sm:px-4 flex flex-col gap-2">
                    <h1
                      className={cn(
                        " text-2xl  text-[var(--clr-secondary)] font-semibold ",
                        font1.className
                      )}
                    >
                      J
                      <span
                        className={cn(
                          " text-lg  text-[var(--clr-secondary)] font-semibold ",
                          font1.className
                        )}
                      >
                        OB
                      </span>
                      {` `}D
                      <span
                        className={cn(
                          " text-lg  text-[var(--clr-secondary)] font-semibold ",
                          font1.className
                        )}
                      >
                        ETAILS
                      </span>
                    </h1>
                    <div className="relative w-full  grid grid-cols-1 md:grid-cols-2 gap-2 px-1">
                      <div className="flex items-center justify-start gap-4 text-wrap">
                        <p
                          className={cn(
                            " text-sm  text-[var(--clr-black-light)] font-bold ",
                            font.className
                          )}
                        >
                          Job Title
                        </p>

                        <p
                          className={cn(
                            " text-sm text-[var(--clr-black-light)] font-normal ",
                            font.className
                          )}
                        >
                          {jobDetailsData?.jobTitle}
                        </p>
                      </div>
                      <div className="flex items-center justify-start gap-4 text-wrap">
                        <p
                          className={cn(
                            " text-sm  text-[var(--clr-black-light)] font-bold ",
                            font.className
                          )}
                        >
                          Salary Range
                        </p>

                        <p
                          className={cn(
                            " text-sm text-[var(--clr-black-light)] font-normal ",
                            font.className
                          )}
                        >
                          {Number(jobDetailsData?.minimumSalary).toFixed(2)}
                          {jobDetailsData?.salaryCurrency}
                          {` `} - {` `}
                          {Number(jobDetailsData?.maximumSalary).toFixed(2)}
                          {jobDetailsData?.salaryCurrency}
                        </p>
                      </div>
                      <div className="flex items-center justify-start gap-4 text-wrap">
                        <p
                          className={cn(
                            " text-sm  text-[var(--clr-black-light)] font-bold ",
                            font.className
                          )}
                        >
                          Job Category
                        </p>

                        <p
                          className={cn(
                            " text-sm text-[var(--clr-black-light)] font-normal ",
                            font.className
                          )}
                        >
                          {jobDetailsData?.jobCategory}
                        </p>
                      </div>
                      <div className="flex items-center justify-start gap-4 text-wrap">
                        <p
                          className={cn(
                            " text-sm  text-[var(--clr-black-light)] font-bold ",
                            font.className
                          )}
                        >
                          Job Type
                        </p>

                        <p
                          className={cn(
                            " text-sm text-[var(--clr-black-light)] font-normal ",
                            font.className
                          )}
                        >
                          {jobDetailsData?.jobType}
                        </p>
                      </div>
                      <div className="flex items-center justify-start gap-4 text-wrap">
                        <p
                          className={cn(
                            " text-sm  text-[var(--clr-black-light)] font-bold ",
                            font.className
                          )}
                        >
                          Location
                        </p>

                        <p
                          className={cn(
                            " text-sm text-[var(--clr-black-light)] font-normal ",
                            font.className
                          )}
                        >
                          {jobDetailsData?.location}
                        </p>
                      </div>
                      <div className="flex items-center justify-start gap-4 text-wrap">
                        <p
                          className={cn(
                            " text-sm  text-[var(--clr-black-light)] font-bold ",
                            font.className
                          )}
                        >
                          Country
                        </p>

                        <p
                          className={cn(
                            " text-sm text-[var(--clr-black-light)] font-normal ",
                            font.className
                          )}
                        >
                          {jobDetailsData?.country?.country_name}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}
        </div>

        <div className=" flex justify-center ">
          <ModalTable
            filteredData={filteredData}
            columns={columns}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            report={report}
            reportFilename="Applications"
            // addButtonTitle="Add New Job"
            // isAdd={true}
            // addModal={addJob}
          />
        </div>
        {/* </CardContent>
      </Card> */}
      </div>
    </>
  );
}
