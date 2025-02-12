"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Breadcrump from "./common/Breadcrump";

// import { CardWrapper } from "@/components/auth/card-wrapper";
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
import {
  AddDiscussionCommentSchema,
  DiscussionMessagesData,
  DiscussionMessagesInfoData,
} from "@/schemas";
import Image from "next/image";
import { createPortal } from "react-dom";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { AlertCardWrapper } from "./common/alert-card-wrapper";
import { CardWrapper } from "./common/card-wrapper";
import { FormButton } from "./common/form-button";
import { ImageWrapper } from "./common/image-wrapper";
import ModalTable from "./common/ModalTable";

import { adddiscussiontopicomment } from "@/actions/discussion";
import moment from "moment";
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
type DiscussionComment = z.infer<typeof AddDiscussionCommentSchema>;

export function DiscussionMessages({ discussionMessagesQueryData }: any) {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [dataList, setDataList] = useState<DiscussionMessagesData[]>([]);
  const [filteredData, setFilteredData] = useState<DiscussionMessagesData[]>(
    []
  );
  const [discussionMessageDetailsData, setDiscussionMessageDetailsData] =
    useState<DiscussionMessagesInfoData>(discussionMessagesQueryData?.data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isAddingDiscussionComment, setIsAddingDiscussionComment] =
    useState<boolean>(false);
  const [isEditingDiscussionComment, setIsEditingDiscussionComment] =
    useState<boolean>(false);
  const { locale, id } = useParams();
  const [report, setReport] = useState<any>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [singleId, setSingleId] = useState<string | undefined>("");
  //   const [paramId, setParamId] = useState<string | undefined>(id && id.toString());

  const pq = searchParams.get("pq") ? searchParams.get("pq") : "";

  const form = useForm<z.infer<typeof AddDiscussionCommentSchema>>({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(AddDiscussionCommentSchema),
  });

  const onSubmit = (values: z.infer<typeof AddDiscussionCommentSchema>) => {
    setError("");
    setSuccess("");

    // console.log(values);
    const discussion_id: any = id;

    startTransition(() => {
      adddiscussiontopicomment(values, locale, discussion_id)
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
            setIsEditingDiscussionComment(false);
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
            setIsEditingDiscussionComment(false);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      // const data = await getsinglejob(id ? id.toString() : "");
      if (discussionMessagesQueryData) {
        if (discussionMessagesQueryData?.success) {
          setDataList(discussionMessagesQueryData?.data?.messages);
          setDiscussionMessageDetailsData(discussionMessagesQueryData?.data);
          setIsLoading(false);
        } else if (discussionMessagesQueryData?.error) {
          setDataList([]);
          // setDiscussionMessageDetailsData(undefined);
          setIsLoading(false);
          // setError(discussionMessagesQueryData?.error);
          toast({
            title: "Error",
            description: discussionMessagesQueryData.error,
            variant: "destructive",
          });
        } else {
          setDataList([]);
          // setDiscussionMessageDetailsData(undefined);
          setIsLoading(false);
        }
      } else {
        setDataList([]);
        // setDiscussionMessageDetailsData(undefined);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  // console.log(
  //   "Comment===============================, ",
  //   discussionMessageDetailsData
  // );

  useEffect(() => {
    const getData = async () => {
      setFilteredData(dataList);

      const rep: any = dataList?.map((dat: DiscussionMessagesData) => {
        return {
          ID: dat.id,
          "Discussion Topic": dat?.user?.topic,
          "Cover Image": dat?.user?.cover_image,
          Comments: dat?.message,
          "Commented By": discussionMessageDetailsData?.added_by?.name,
          "Commented At": dat?.date_added,
          Status: dat?.status,
        };
      });
      setReport(rep);
    };
    getData();
  }, [dataList]);

  useEffect(() => {
    let result = dataList;
    if (q && q.length > 3) {
      result = dataList.filter((data: DiscussionMessagesData) => {
        return (
          data?.user?.topic.toLowerCase().includes(q.toLowerCase()) ||
          data?.message.toLowerCase().includes(q.toLowerCase())
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
        headerLabel={type === "CREATE" ? "Create New Comment" : "Edit Comment"}
        // subHeaderLabel="Welcome back"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[260px] xs:w-[300px] sm:w-[340px] "
          >
            <div className="space-y-4">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter a Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="Enter a brief information about job."
                          className={`rounded-[6px]  !min-h-[100px] !max-h-[10vh] bg-[var(--clr-silver-v6)] placeholder:text-left ${
                            form.formState.errors.message
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
    singleData?: DiscussionMessagesData;
  }) => {
    return (
      <ImageWrapper
      // subHeaderLabel="Welcome back"
      >
        <div className="relative w-[260px] xs:w-[300px] sm:w-[340px] h-[260px] xs:h-[300px] sm:h-[340px] flex items-center justify-center !rounded-xl">
          {singleData?.user?.cover_image ? (
            <Image
              src={singleData?.user?.cover_image}
              alt="-"
              fill
              className="object-cover object-center !rounded-xl"
            />
          ) : (
            <div className="bg-[var(--clr-secondary)] text-[var(--clr-primary)] flex items-center justify-center w-full h-full">
              <h1 className="text-4xl font-bold">
                {discussionMessageDetailsData?.added_by?.name
                  ?.split("")
                  ?.shift()
                  ?.toUpperCase()}
              </h1>
            </div>
          )}
        </div>
      </ImageWrapper>
    );
  };

  const columns: TableColumn<DiscussionMessagesData>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "Discussion Topic",
        minWidth: "250px",
        cell: (row: any) => row?.user?.topic,
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
                <AvatarImage src={row?.user?.cover_image || ""} />
                <AvatarFallback className="bg-[var(--clr-secondary)] text-[var(--clr-primary)]">
                  {discussionMessageDetailsData?.added_by?.name
                    ?.split("")
                    ?.shift()
                    ?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </FormButton>
        ),
      },
      {
        name: "Comments",
        minWidth: "250px",
        cell: (row: any) => row?.message,
      },
      {
        name: "Commented By",
        minWidth: "250px",
        cell: (row: any) => discussionMessageDetailsData?.added_by?.name,
      },
      {
        name: "Commented At",
        minWidth: "200px",
        cell: (row: any) => moment(row?.date_added).format("LLL"),
      },
      {
        name: "Status",
        // width: "120px",
        // cell: (row: any) => "Enabled",
        selector: (row) => (row?.status == 1 ? "Approved" : "Declined"),
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
      // {
      //   name: "Action",
      //   width: "140px",
      //   cell: (row) => (
      //     <div className="flex justify-center items-center">
      //       <div className="flex gap-6">
      //         <div onClick={() => processApplication(row)}>
      //           <ToolTip tooltip="Process Application">
      //             {/* <FormButton
      //               asChild
      //               Form={() => HandleForm({ type: "EDIT", single: row })}
      //             > */}
      //             <div>
      //               <FiEdit
      //                 //   onClick={() => editWallet(row)}
      //                 className="text-xl font-black  cursor-pointer"
      //               />
      //             </div>
      //             {/* </FormButton> */}
      //           </ToolTip>
      //         </div>
      //       </div>
      //     </div>
      //   ),
      // },
    ],
    []
  );

  const handleCloseButtonClick = () => {
    // console.log("Close button Clicked");
    setIsAddingDiscussionComment(false);
    setIsEditingDiscussionComment(false);
  };

  const addComment = () => {
    form.reset();

    setIsAddingDiscussionComment(true);
  };

  // const processApplication = (job: any) => {
  //   form.setValue("application_id", job?.application_id);
  //   form.setValue("status", job?.status);

  //   setIsEditingDiscussionComment(true);
  // };

  return (
    <>
      {isAddingDiscussionComment &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{HandleForm({ type: "CREATE" })}</div>
          </ModalForm>,
          document.body
        )}

      {/* {isEditingDiscussionComment &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{HandleForm({ type: "EDIT" })}</div>
          </ModalForm>,
          document.body
        )} */}

      <div className={`flex-1 flex flex-col  `}>
        <div className="fixed z-[20] bg-white w-full pb-2">
          <Breadcrump
            prePath={`${pathname.split("/")[1]} / ${pathname.split("/")[2]}`}
            title={"Comments"}
          />

          <div>
            <Button
              variant={"ghost"}
              size={"icon"}
              asChild
              className="bg-[var(--clr-silver-v6)] rounded-[6px]"
            >
              <Link
                href={
                  locale === "en"
                    ? `/admin/discussion`
                    : `/${locale}/admin/discussion`
                }
              >
                <MdOutlineArrowBackIosNew className="text-xl text-[var(--clr-secondary)]" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-24 flex justify-center ">
          <ModalTable
            filteredData={filteredData}
            columns={columns}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            report={report}
            reportFilename="Comments"
            addButtonTitle="Add A Comment"
            isAdd={true}
            addModal={addComment}
          />
        </div>
        {/* </CardContent>
      </Card> */}
      </div>
    </>
  );
}
