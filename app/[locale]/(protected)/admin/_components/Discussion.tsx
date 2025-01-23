"use client";

import ToolTip from "@/components/common/ToolTip";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import Breadcrump from "./common/Breadcrump";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

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
import { discussions } from "@/lib/discussion";
import { DiscussionData, DiscussionFormSchema } from "@/schemas";
import Image from "next/image";
import { createPortal } from "react-dom";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { AlertCardWrapper } from "./common/alert-card-wrapper";
import { CardWrapper } from "./common/card-wrapper";
import { FormButton } from "./common/form-button";
import { ImageWrapper } from "./common/image-wrapper";
import ModalTable from "./common/ModalTable";

export function DiscussionDataTable() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [dataList, setDataList] = useState<DiscussionData[]>([]);
  const [filteredData, setFilteredData] = useState<DiscussionData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [isAddingDiscussion, setIsAddingDiscussion] = useState<boolean>(false);
  const [isEditingDiscussion, setIsEditingDiscussion] =
    useState<boolean>(false);

  const [report, setReport] = useState<any>([]);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DiscussionFormSchema>>({
    resolver: zodResolver(DiscussionFormSchema),
    defaultValues: {
      topic: "",
      hashTags: [{ hash: "" }],
    },
  });

  const control = form.control;

  const discussionHashTagsArray = useFieldArray({
    name: "hashTags",
    control,
    //  rules: {
    //    required: "Please append at least 1 Job Specification",
    //  },
  });

  const onSubmit = (values: z.infer<typeof DiscussionFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      // login(values, locale, callbackUrl)
      //   .then((data) => {
      //     if (data?.error) {
      //       form.reset();
      //       setError(data.error);
      //     }
      //     if (data?.success) {
      //       form.reset();
      //       setSuccess(data.success);
      //     }
      //     if (data?.twoFactor) {
      //       setShowTwoFactor(true);
      //     }
      //   })
      //   .catch(() => setError("Something went wrong"));
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const data = await discussions();
      setDataList(data.discussionListData);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setFilteredData(dataList);

      const rep: any = dataList?.map((dat: DiscussionData) => {
        return {
          ID: dat.key,
          Topic: dat.topic,
          Coments: JSON.stringify(dat.comments),
          HashTags: JSON.stringify(dat.hashTags),
          "Created By": dat.createdBy,
          "Created Time": dat.createdAt,
          "Published Date": dat.createdAt,
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
              <>
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

                <div>
                  <p className="text-[0.9rem] font-medium mb-2">Hashtags</p>
                  <div className=" space-y-2">
                    {discussionHashTagsArray.fields.map((field, index) => {
                      const errorForField =
                        form.formState.errors?.hashTags?.[index]?.hash;
                      return (
                        <div key={field.hash} className="w-full flex flex-col">
                          <div className="flex flex-row items-end gap-2">
                            <div className="flex-1 !h-[38px] ">
                              <input
                                {...form.register(
                                  `hashTags.${index}.hash` as const
                                )}
                                placeholder="eg. bible"
                                defaultValue={field.hash}
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
                                  onClick={() =>
                                    discussionHashTagsArray.remove(index)
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

                  <p>{form.formState.errors.hashTags?.message}</p>
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
                          discussionHashTagsArray.append({ hash: "" });
                          form.trigger("hashTags");
                        }}
                      >
                        <HiOutlinePlus className="text-lg text-[var(--clr-secondary)]" />
                        <span>Add New Hashtag</span>
                      </p>
                    </Button>
                  </div>
                </div>
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

  const HandleImagePreview = ({
    singleData,
  }: {
    singleData?: DiscussionData;
  }) => {
    return (
      <ImageWrapper
      // subHeaderLabel="Welcome back"
      >
        <div className="relative w-[260px] xs:w-[300px] sm:w-[340px] h-[260px] xs:h-[300px] sm:h-[340px] flex items-center justify-center !rounded-xl">
          {singleData?.image ? (
            <Image
              src={singleData?.image}
              alt="-"
              fill
              className="object-cover object-center !rounded-xl"
            />
          ) : (
            <div className="bg-[var(--clr-secondary)] text-[var(--clr-primary)] flex items-center justify-center w-full h-full">
              <h1 className="text-4xl font-bold">
                {singleData?.createdBy?.split("")?.shift()?.toUpperCase()}
              </h1>
            </div>
          )}
        </div>
      </ImageWrapper>
    );
  };

  const columns: TableColumn<DiscussionData>[] = useMemo(
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
                <AvatarImage src={row?.image || ""} />
                <AvatarFallback className="bg-[var(--clr-secondary)] text-[var(--clr-primary)]">
                  {row?.createdBy?.split("")?.shift()?.toUpperCase()}
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
        cell: (row: any) => row?.createdBy,
      },
      {
        name: "Action",
        width: "140px",
        cell: (row) => (
          <div className="flex justify-center items-center">
            <div onClick={() => editDiscussion(row)} className="flex gap-6">
              {/* {row.status === "success" ? (
                <ToolTip tooltip="Deactivate">
                  <AlertButton
                    asChild
                    Form={() =>
                      HandleConfirmPromt({
                        alertText: "disactivate this discussion",
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
                <ToolTip tooltip="Activate">
                  <AlertButton
                    asChild
                    Form={() =>
                      HandleConfirmPromt({
                        alertText: "activate this discussion",
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
              )} */}
              <ToolTip tooltip="Edit Discussion Topic">
                {/* <FormButton asChild Form={HandleForm}> */}
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
        ),
      },
    ],
    []
  );

  const handleCloseButtonClick = () => {
    // console.log("Close button Clicked");
    setIsAddingDiscussion(false);
    setIsEditingDiscussion(false);
  };

  const addDiscussion = () => {
    // form.setValue("title", "");
    // form.setValue("information", "");
    // form.setValue("image", "");
    form.reset();
    setIsAddingDiscussion(true);
  };

  const editDiscussion = (discussion: DiscussionData) => {
    form.setValue("hashTags", [...discussion?.hashTags]);
    form.setValue("topic", discussion?.topic);

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
            reportFilename="Payments"
            addButtonTitle="Add Payment"
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
