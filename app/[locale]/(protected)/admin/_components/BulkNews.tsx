"use client";

import ToolTip from "@/components/common/ToolTip";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import * as z from "zod";
import Breadcrump from "./common/Breadcrump";

// import { CardWrapper } from "@/components/auth/card-wrapper";
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
import { newsletters } from "@/lib/newsletter";
import { BulkEmailFormSchema } from "@/schemas";
import { createPortal } from "react-dom";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { AlertCardWrapper } from "./common/alert-card-wrapper";
import { CardWrapper } from "./common/card-wrapper";
import ModalTable from "./common/ModalTable";
import Tiptap from "./common/Tiptap";

export type NewsLetter = {
  id: string;
  subject: string;
  content: string;
};

export function BulkNewsDataTable() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [dataList, setDataList] = useState<NewsLetter[]>([]);
  const [filteredData, setFilteredData] = useState<NewsLetter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [isAddingNewsLetter, setIsAddingNewsLetter] = useState<boolean>(false);
  const [isEditingNewsLetter, setIsEditingNewsLetter] =
    useState<boolean>(false);

  const [report, setReport] = useState<any>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof BulkEmailFormSchema>>({
    resolver: zodResolver(BulkEmailFormSchema),
    defaultValues: {
      subject: "",
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof BulkEmailFormSchema>) => {
    setError("");
    setSuccess("");

    console.log(values);
    startTransition(async () => {
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
      const data = await newsletters();
      setDataList(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setFilteredData(dataList);

      const rep: any = dataList?.map((dat: NewsLetter) => {
        return {
          ID: dat.id,
          Subject: dat.subject,
          Content: dat.content,
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
        return data?.subject.toLowerCase().includes(q.toLowerCase());
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
          type === "CREATE" ? "Create NewsLetter" : "NewsLetter Details"
        }
        // subHeaderLabel="Welcome back"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[260px] xs:w-[300px] sm:w-[340px] md:w-[600px]"
          >
            <div className="space-y-4">
              <>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Subject</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter subject here..."
                          className={` bg-[var(--clr-silver-v6)] ${
                            form.formState.errors.subject
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                          // disabled={type === "CREATE" ? false : true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {type === "CREATE" ? (
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Draft Content</FormLabel>
                        <FormControl>
                          <Tiptap
                            onChangeHandler={field.onChange}
                            value={field.value}
                            isError={
                              form.formState.errors.content ? true : false
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div className="mt-4 gap-6">
                    <FormLabel>Draft Content</FormLabel>
                    <div
                      className="ProseMirror bg-[#f6f6f6] whitespace-pre-line  px-6 py-4 rounded-lg mt-2"
                      style={{ whiteSpace: "pre-line" }}
                      dangerouslySetInnerHTML={{
                        __html: form.watch("content"),
                      }}
                    />
                  </div>
                )}
              </>
            </div>
            <div className="!mb-4 !mt-6 !pt-4">
              {type === "CREATE" && (
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full bg-[var(--clr-secondary)] "
                >
                  Send
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardWrapper>
    );
  };

  const columns: TableColumn<NewsLetter>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "80px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "Subject",
        minWidth: "300px",
        cell: (row: any) => row?.subject,
      },
      {
        name: "Content",
        minWidth: "450px",
        cell: (row: any) => row?.content,
      },
      {
        name: "Action",
        width: "140px",
        cell: (row) => (
          <div className="flex justify-center items-center">
            <div onClick={() => editNewsLetter(row)} className="flex gap-6">
              <ToolTip tooltip="View Details">
                {/* <FormButton
                  asChild
                  Form={() => HandleForm({ type: "EDIT", singleData: row })}
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
        ),
      },
    ],
    []
  );

  const handleCloseButtonClick = () => {
    // console.log("Close button Clicked");
    setIsAddingNewsLetter(false);
    setIsEditingNewsLetter(false);
  };

  const addNewsLetter = () => {
    form.reset();
    setIsAddingNewsLetter(true);
  };

  const editNewsLetter = (newsletter: NewsLetter) => {
    form.setValue("subject", newsletter?.subject);
    form.setValue("content", newsletter?.content);

    setIsEditingNewsLetter(true);
  };

  return (
    <>
      {isAddingNewsLetter &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{HandleForm({ type: "CREATE" })}</div>
          </ModalForm>,
          document.body
        )}

      {isEditingNewsLetter &&
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
            reportFilename="NewsLetters"
            addButtonTitle="Create NewsLetter"
            isAdd={true}
            addModal={addNewsLetter}
          />
        </div>
        {/* </CardContent>
      </Card> */}
      </div>
    </>
  );
}
