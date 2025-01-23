"use client";

import ToolTip from "@/components/common/ToolTip";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import Breadcrump from "./common/Breadcrump";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// import { CardWrapper } from "@/components/auth/card-wrapper";
import { getcountry } from "@/actions/country";
import { addscholarship, updatescholarship } from "@/actions/scholarships";
import DropdownRCountry from "@/components/common/DropdownRCountry";
import ModalForm from "@/components/common/Modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useUploadThing } from "@/lib/uploadthing";
import { ScholarshipFormSchema, ScholarshipInfoData } from "@/schemas";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { CiViewList } from "react-icons/ci";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { ImageUploader } from "../../_components/ImageUploader";
import { AlertCardWrapper } from "./common/alert-card-wrapper";
import { CardWrapper } from "./common/card-wrapper";
import { FormButton } from "./common/form-button";
import { ImageWrapper } from "./common/image-wrapper";
import ModalTable from "./common/ModalTable";
import { Country } from "./setups/Country";

export function ScholarshipDataTable({ scholarshipDataQuery }: any) {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [dataList, setDataList] = useState<ScholarshipInfoData[]>([]);
  const [filteredData, setFilteredData] = useState<ScholarshipInfoData[]>([]);
  const [countryData, setCountryData] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [isAddingScholarship, setIsAddingScholarship] =
    useState<boolean>(false);
  const [isEditingScholarship, setIsEditingScholarship] =
    useState<boolean>(false);
  const { locale } = useParams();
  const [report, setReport] = useState<any>([]);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [singleId, setSingleId] = useState<string | undefined>("");

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof ScholarshipFormSchema>>({
    resolver: zodResolver(ScholarshipFormSchema),
    defaultValues: {
      title: "",
      country_id: "",
      infomation: "",
      cover_image_url: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ScholarshipFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      let uploadedCoverImageUrl = values.cover_image_url;
      let upImages;

      if (imageFiles.length > 0) {
        const uploadedImages = await startUpload(imageFiles);

        if (!uploadedImages) {
          return;
        }
        console.log("Image file url================, ", uploadedImages[0]);

        // uploadedCoverImageUrl = uploadedImages[0].url;
        // upImages = uploadedImages[0].url

        const newvalues = {
          title: values.title,
          country_id: values.country_id,
          infomation: values.infomation,
          cover_image_url: uploadedImages[0].url,
        };

        if (isAddingScholarship) {
          startTransition(() => {
            addscholarship(newvalues, locale)
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

        if (isEditingScholarship) {
          startTransition(() => {
            updatescholarship(newvalues, locale, singleId!)
              .then(async (data: any) => {
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
      }

      // if(upImages){
      // const newvalues =  {
      //       title: values.title,
      //       country_id: values.country_id,
      //       infomation: values.infomation,
      //       cover_image_url: uploadedCoverImageUrl,
      //     }

      // if (isAddingScholarship) {
      //   startTransition(() => {
      //     addscholarship(newvalues, locale)
      //       .then((data) => {
      //         // console.log(data);
      //         if (data?.error) {
      //           form.reset();
      //           // setError(data.error);
      //           toast({
      //             title: "Error",
      //             description: data.error,
      //             variant: "destructive",
      //           });
      //           handleCloseButtonClickAddEdit();
      //         }
      //         if (data?.success) {
      //           form.reset();
      //           // setSuccess(data.success);
      //           toast({
      //             title: "Success",
      //             description: data.success,
      //             variant: "default",
      //           });
      //           setFilteredData(data.data);
      //           handleCloseButtonClickAddEdit();
      //         }
      //       })
      //       .catch(() => setError("Something went wrong"));
      //   });
      // }

      // if (isEditingScholarship) {
      //   startTransition(() => {
      //     updatescholarship(newvalues, locale, singleId!)
      //       .then(async (data: any) => {
      //         // console.log(data);
      //         if (data?.error) {
      //           form.reset();
      //           // setError(data.error);
      //           toast({
      //             title: "Error",
      //             description: data.error,
      //             variant: "destructive",
      //           });
      //           handleCloseButtonClickAddEdit();
      //         }
      //         if (data?.success) {
      //           form.reset();
      //           // setSuccess(data.success);
      //           toast({
      //             title: "Success",
      //             description: data.success,
      //             variant: "default",
      //           });
      //           setFilteredData(data.data);
      //           handleCloseButtonClickAddEdit();
      //         }
      //       })
      //       .catch(() => setError("Something went wrong"));
      //   });
      // }
      // };
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      // const data = await getscholarships();
      if (scholarshipDataQuery?.success) {
        setDataList(scholarshipDataQuery?.data);
        setIsLoading(false);
      } else if (scholarshipDataQuery?.error) {
        setDataList([]);
        setIsLoading(false);
        // setError(scholarshipDataQuery?.error);
        toast({
          title: "Error",
          description: scholarshipDataQuery.error,
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

      const rep: any = dataList?.map((dat: ScholarshipInfoData) => {
        return {
          ID: dat.id,
          Title: dat.title,
          Country: dat.country.country_name,
          Information: dat.infomation,
          "Cover Image": dat.cover_image_url,
        };
      });
      setReport(rep);
    };
    getData();
  }, [dataList]);

  useEffect(() => {
    let result = dataList;
    if (q && q.length > 3) {
      result = dataList.filter((data: ScholarshipInfoData) => {
        return (
          data?.title.toLowerCase().includes(q.toLowerCase()) ||
          data?.country?.country_name.toLowerCase().includes(q.toLowerCase()) ||
          data?.infomation.toLowerCase().includes(q.toLowerCase())
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
          type === "CREATE" ? "Create New Scholarship" : "Update Scholarship"
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scholarship Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter Scholarship Title"
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.title
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
                name="infomation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scholarship Information</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="Type Additional Notes Here."
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
                name="cover_image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Cover Image</FormLabel>
                    <FormControl>
                      <ImageUploader
                        onFieldChange={field.onChange}
                        imageUrl={field.value}
                        setFiles={setImageFiles}
                        isError={
                          form.formState.errors.cover_image_url ? true : false
                        }
                      />
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

  const HandleImagePreview = ({
    singleData,
  }: {
    singleData?: ScholarshipInfoData;
  }) => {
    return (
      <ImageWrapper
      // subHeaderLabel="Welcome back"
      >
        <div className="relative w-[260px] xs:w-[300px] sm:w-[340px] h-[260px] xs:h-[300px] sm:h-[340px] flex items-center justify-center !rounded-xl">
          {singleData?.cover_image_url ? (
            <Image
              src={singleData?.cover_image_url}
              alt="-"
              fill
              className="object-cover object-center !rounded-xl"
            />
          ) : (
            <div className="bg-[var(--clr-secondary)] text-[var(--clr-primary)] flex items-center justify-center w-full h-full">
              <h1 className="text-4xl font-bold">
                {singleData?.title?.split("")?.shift()?.toUpperCase()}
              </h1>
            </div>
          )}
        </div>
      </ImageWrapper>
    );
  };

  const columns: TableColumn<ScholarshipInfoData>[] = useMemo(
    () => [
      {
        name: "ID",
        // width: "100px",
        selector: (row: any, index: any) => index + 1,
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
                <AvatarImage src={row?.cover_image_url || ""} />
                <AvatarFallback className="bg-[var(--clr-secondary)] text-[var(--clr-primary)]">
                  {row?.title?.split("")?.shift()?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </FormButton>
        ),
      },
      {
        name: "Title",
        minWidth: "300px",
        cell: (row: any) => row?.title,
      },
      {
        name: "Information",
        minWidth: "450px",
        cell: (row: any) => row?.infomation,
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
                    ? `/admin/scholarship/${row.scholarship_id}`
                    : `/${locale}/admin/scholarship/${row.scholarship_id}`
                }
              >
                <ToolTip tooltip="View Scholarship Applications">
                  <CiViewList className="text-xl font-black  cursor-pointer" />
                </ToolTip>
              </Link>
              <div onClick={() => editScholarship(row)}>
                <ToolTip tooltip="Edit Scholarship">
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
    setIsAddingScholarship(false);
    setIsEditingScholarship(false);
    setSingleId("");
  };

  const handleCloseButtonClick = () => {
    // console.log("Close button Clicked");
    setIsAddingScholarship(false);
    setIsEditingScholarship(false);
  };

  const addScholarship = () => {
    form.reset();

    setIsAddingScholarship(true);
  };

  const editScholarship = (scholarship: ScholarshipInfoData) => {
    form.setValue("title", scholarship?.title);
    form.setValue("infomation", scholarship?.infomation);
    form.setValue("cover_image_url", scholarship?.cover_image_url);
    form.setValue("country_id", scholarship?.country_id);

    setSingleId(scholarship?.scholarship_id);

    setIsEditingScholarship(true);
  };

  return (
    <>
      {isAddingScholarship &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{HandleForm({ type: "CREATE" })}</div>
          </ModalForm>,
          document.body
        )}

      {isEditingScholarship &&
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
            reportFilename="Scholarships"
            addButtonTitle="Add New Scholarship"
            isAdd={true}
            addModal={addScholarship}
          />
        </div>
        {/* </CardContent>
      </Card> */}
      </div>
    </>
  );
}
