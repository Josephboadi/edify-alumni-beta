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
import { adddiscussion, updatediscussiontopic } from "@/actions/discussion";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { DiscussionInfoData, NewDiscussionFormSchema } from "@/schemas";
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

type NewDiscussionFormValues = z.infer<typeof NewDiscussionFormSchema>;
export function DiscussionDataTable({ discussionQueryData }: any) {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [dataList, setDataList] = useState<DiscussionInfoData[]>([]);
  const [filteredData, setFilteredData] = useState<DiscussionInfoData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [singleDataImage, setSingleDataImage] = useState<string>("");
  const [isAddingDiscussion, setIsAddingDiscussion] = useState<boolean>(false);
  const [isEditingDiscussion, setIsEditingDiscussion] =
    useState<boolean>(false);
  const { locale } = useParams();
  const [report, setReport] = useState<any>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [singleId, setSingleId] = useState<number>(0);
  const [discussionId, setDiscussionId] = useState<string>("");
  const [dateAdded, setDateAdded] = useState<string>("");
  const [infoStatus, setInfoStatus] = useState<number>(0);
  const [addedBy, setAddedBy] = useState<string>("");
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<NewDiscussionFormValues>({
    defaultValues: {
      topic: "",
      cover_image: "",
      // discussionHashTag: [""],
    },
    resolver: zodResolver(NewDiscussionFormSchema),
  });

  // const discussionHashTagsArray = useFieldArray({
  //   control: form.control,
  //   // @ts-ignore
  //   name: "discussionHashTag",
  //   rules: {
  //     required: "Please append at least 1 hash tag",
  //   },
  // });

  const onSubmit = (values: z.infer<typeof NewDiscussionFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      if (isAddingDiscussion) {
        if (imageFiles.length > 0) {
          const uploadedImages = await startUpload(imageFiles);

          if (!uploadedImages) {
            return;
          }
          // console.log("Image file url================, ", uploadedImages[0]);

          const uploadedCoverImageUrl = uploadedImages[0].url;
          const data = {
            topic: values.topic,
            cover_image: uploadedCoverImageUrl,
            // discussionHashTag: values.discussionHashTag,
          };
          adddiscussion(data, locale)
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
        }
      }
      if (isEditingDiscussion) {
        const id = singleId;
        const discussion_id = discussionId;
        const date_added = dateAdded;
        const status = infoStatus;
        const added_by_id = addedBy;

        if (singleDataImage && singleDataImage === values.cover_image) {
          const data = {
            topic: values.topic,
            cover_image: values.cover_image,
            // discussionHashTag: values.discussionHashTag,
          };

          updatediscussiontopic(
            data,
            locale,
            id,
            discussion_id,
            date_added,
            status,
            added_by_id
          )
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
        } else {
          if (imageFiles.length > 0) {
            const uploadedImages = await startUpload(imageFiles);

            if (!uploadedImages) {
              return;
            }
            // console.log("Image file url================, ", uploadedImages[0]);

            const uploadedCoverImageUrl = uploadedImages[0].url;
            const data = {
              topic: values.topic,
              cover_image: uploadedCoverImageUrl,
              // discussionHashTag: values.discussionHashTag,
            };
            updatediscussiontopic(
              data,
              locale,
              id,
              discussion_id,
              date_added,
              status,
              added_by_id
            )
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
          }
        }
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      // const data = await getdiscussions();
      if (discussionQueryData) {
        if (discussionQueryData?.success) {
          setDataList(discussionQueryData?.data);
          setIsLoading(false);
        } else if (discussionQueryData?.error) {
          setDataList([]);
          setIsLoading(false);
          // setError(discussionQueryData?.error);
          toast({
            title: "Error",
            description: discussionQueryData.error,
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
    const getData = async () => {
      setFilteredData(dataList);

      const rep: any = dataList?.map((dat: DiscussionInfoData) => {
        return {
          ID: dat.id,
          Topic: dat.topic,
          "Number of Comments": dat._count.messages,
          // HashTags: JSON.stringify(dat.hashTags),
          "Created By": dat.added_by.name,
          "Published Date": dat.date_added,
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
          data?.topic.toLowerCase().includes(q.toLowerCase()) ||
          data?.createdBy.toLowerCase().includes(q.toLowerCase())
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
        headerLabel={type === "CREATE" ? "Create New Event" : "Update Event"}
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
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discussion Topic</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="Type a Topic for Discussion."
                        className={`rounded-[6px]  !min-h-[100px] !max-h-[10vh] bg-[var(--clr-silver-v6)] placeholder:text-left ${
                          form.formState.errors.topic
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
                name="cover_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discussion Cover Image</FormLabel>
                    <FormControl>
                      <ImageUploader
                        onFieldChange={field.onChange}
                        imageUrl={field.value}
                        setFiles={setImageFiles}
                        isError={
                          form.formState.errors.cover_image ? true : false
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div>
                <p className="text-[0.9rem] font-medium mb-2">Hash Tags</p>
                <div className=" space-y-2">
                  {discussionHashTagsArray.fields.map((field, index) => {
                    const errorForField =
                      form.formState.errors?.discussionHashTag?.[index];
                    return (
                      <div key={field.id} className="w-full flex flex-col">
                        <div className="flex flex-row items-end gap-2">
                          <div className="flex-1 !h-[38px] ">
                            <input
                              {...form.register(
                                `discussionHashTag.${index}` as const
                              )}
                              placeholder="eg. #bible"
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
                              className="  w-5 h-5 shadow-lg  mb-1 flex items-center justify-center"
                            >
                              <FaTrashAlt
                                onClick={() => discussionHashTagsArray.remove(index)}
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

                <p>{form.formState.errors.discussionHashTag?.message}</p>
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
                        discussionHashTagsArray.append("");
                        form.trigger("eventHashTag");
                      }}
                    >
                      <HiOutlinePlus className="text-lg text-[var(--clr-secondary)]" />
                      <span>Add New Hashtag</span>
                    </p>
                  </Button>
                </div>
              </div> */}
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
    singleData?: DiscussionInfoData;
  }) => {
    return (
      <ImageWrapper
      // subHeaderLabel="Welcome back"
      >
        <div className="relative w-[260px] xs:w-[300px] sm:w-[340px] h-[260px] xs:h-[300px] sm:h-[340px] flex items-center justify-center !rounded-xl">
          {singleData?.cover_image ? (
            <Image
              src={singleData?.cover_image}
              alt="-"
              fill
              className="object-cover object-center !rounded-xl"
            />
          ) : (
            <div className="bg-[var(--clr-secondary)] text-[var(--clr-primary)] flex items-center justify-center w-full h-full">
              <h1 className="text-4xl font-bold">
                {singleData?.added_by?.name?.split("")?.shift()?.toUpperCase()}
              </h1>
            </div>
          )}
        </div>
      </ImageWrapper>
    );
  };

  const columns: TableColumn<DiscussionInfoData>[] = useMemo(
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
            <div className="cursor-pointer">
              <Avatar className="w-[45px] h-[45px] relative">
                <AvatarImage src={row?.cover_image || ""} />
                <AvatarFallback className="bg-[var(--clr-secondary)] text-[var(--clr-primary)]">
                  {row?.added_by?.name?.split("")?.shift()?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </FormButton>
        ),
      },
      {
        name: "Topic",
        minWidth: "450px",
        cell: (row: any) => row?.topic,
      },
      {
        name: "Created By",
        minWidth: "300px",
        cell: (row: any) => row?.added_by?.name,
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
                    ? `/admin/discussion/${row.discussion_id}`
                    : `/${locale}/admin/discussion/${row.discussion_id}`
                }
              >
                <ToolTip tooltip="View Discussion Messages">
                  <CiViewList className="text-xl font-black  cursor-pointer" />
                </ToolTip>
              </Link>
              <div onClick={() => editDiscussion(row)}>
                <ToolTip tooltip="Edit Discussion">
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
    setIsAddingDiscussion(false);
    setIsEditingDiscussion(false);
    setSingleId(0);
    setDiscussionId("");
    setDateAdded("");
    setInfoStatus(0);
    setAddedBy("");
    setSingleDataImage("");
  };

  const handleCloseButtonClick = () => {
    // console.log("Close button Clicked");
    setIsAddingDiscussion(false);
    setIsEditingDiscussion(false);
  };

  const addDiscussion = () => {
    form.reset();

    setIsAddingDiscussion(true);
  };

  const editDiscussion = (discussion: DiscussionInfoData) => {
    // form.setValue("discussionHashTag", [...discussion?.discussionHashTag]);
    form.setValue("topic", discussion?.topic);
    form.setValue("cover_image", discussion?.cover_image);

    setSingleId(discussion?.id);
    setDiscussionId(discussion?.discussion_id);
    setDateAdded(discussion?.date_added);
    setInfoStatus(discussion?.status);
    setAddedBy(discussion?.added_by_id);
    setSingleDataImage(discussion?.cover_image);

    setIsEditingDiscussion(true);
  };

  return (
    <>
      {isAddingDiscussion &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{HandleForm({ type: "CREATE" })}</div>
          </ModalForm>,
          document.body
        )}

      {isEditingDiscussion &&
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
            reportFilename="Discussions"
            addButtonTitle="Add Discussion"
            isAdd={true}
            addModal={addDiscussion}
          />
        </div>
        {/* </CardContent>
      </Card> */}
      </div>
    </>
  );
}
