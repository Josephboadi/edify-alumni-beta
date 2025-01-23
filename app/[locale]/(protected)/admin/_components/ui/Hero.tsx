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
import Breadcrump from "../common/Breadcrump";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { heroes } from "@/lib/hero";
import { useUploadThing } from "@/lib/uploadthing";
import { HeroData, HeroFormSchema } from "@/schemas";
import Image from "next/image";
import { createPortal } from "react-dom";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { ImageUploader } from "../../../_components/ImageUploader";
import { AlertCardWrapper } from "../common/alert-card-wrapper";
import { CardWrapper } from "../common/card-wrapper";
import { FormButton } from "../common/form-button";
import { ImageWrapper } from "../common/image-wrapper";
import ModalTable from "../common/ModalTable";

export function HeroDataTable() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [dataList, setDataList] = useState<HeroData[]>([]);
  const [filteredData, setFilteredData] = useState<HeroData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [isAddingHero, setIsAddingHero] = useState<boolean>(false);
  const [isEditingHero, setIsEditingHero] = useState<boolean>(false);

  const [report, setReport] = useState<any>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { startUpload } = useUploadThing("imageUploader");
  const startDateTimeLocalNow = new Date();
  // new Date().getTime() - new Date().getTimezoneOffset() * 60_000
  const endDateTimeLocalNow = new Date();
  // new Date().getTime() - new Date().getTimezoneOffset() * 60_000
  // .toISOString().slice(0, 16);

  const form = useForm<z.infer<typeof HeroFormSchema>>({
    resolver: zodResolver(HeroFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  const onSubmit = (values: z.infer<typeof HeroFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      let uploadedCoverImageUrl = values.image;

      if (imageFiles.length > 0) {
        const uploadedImages = await startUpload(imageFiles);

        if (!uploadedImages) {
          return;
        }
        console.log("Image file url================, ", uploadedImages[0]);

        uploadedCoverImageUrl = uploadedImages[0].url;
      }
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
      const data = await heroes();
      setDataList(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setFilteredData(dataList);

      const rep: any = dataList?.map((dat: HeroData) => {
        return {
          ID: dat.key,
          Title: dat.title,
          Description: dat.description,
          Image: dat.image,
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
          data?.title.toLowerCase().includes(q.toLowerCase()) ||
          data?.description.toLowerCase().includes(q.toLowerCase())
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
        headerLabel={type === "CREATE" ? "Create New Hero" : "Update Hero"}
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hero Info Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter envent title"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hero Info Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="Type Additional Notes Here."
                          className={`rounded-[6px]  !min-h-[100px] !max-h-[10vh] bg-[var(--clr-silver-v6)] placeholder:text-left ${
                            form.formState.errors.description
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
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Hero Image</FormLabel>
                      <FormControl>
                        <ImageUploader
                          onFieldChange={field.onChange}
                          imageUrl={field.value}
                          setFiles={setImageFiles}
                          isError={form.formState.errors.image ? true : false}
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

  const HandleImagePreview = ({ singleData }: { singleData?: HeroData }) => {
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
                {singleData?.title?.split("")?.shift()?.toUpperCase()}
              </h1>
            </div>
          )}
        </div>
      </ImageWrapper>
    );
  };

  const columns: TableColumn<HeroData>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "80px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "Hero Image",
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
        name: "Description",
        minWidth: "450px",
        cell: (row: any) => row?.description,
      },
      {
        name: "Action",
        width: "140px",
        cell: (row) => (
          <div className="flex justify-center items-center">
            <div onClick={() => editHero(row)} className="flex gap-6">
              <ToolTip tooltip="Edit Hero">
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
    setIsAddingHero(false);
    setIsEditingHero(false);
  };

  const addHero = () => {
    // form.setValue("title", "");
    // form.setValue("information", "");
    // form.setValue("image", "");
    form.reset();
    setIsAddingHero(true);
  };

  const editHero = (hero: HeroData) => {
    form.setValue("title", hero?.title);
    form.setValue("description", hero?.description);
    form.setValue("image", hero?.image);

    setIsEditingHero(true);
  };

  return (
    <>
      {isAddingHero &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{HandleForm({ type: "CREATE" })}</div>
          </ModalForm>,
          document.body
        )}

      {isEditingHero &&
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
            reportFilename="Heros"
            addButtonTitle="Add Hero"
            isAdd={true}
            addModal={addHero}
          />
        </div>
        {/* </CardContent>
      </Card> */}
      </div>
    </>
  );
}
