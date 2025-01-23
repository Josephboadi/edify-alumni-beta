"use client";

import ToolTip from "@/components/common/ToolTip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
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
import { news } from "@/lib/news";
import { useUploadThing } from "@/lib/uploadthing";
import { BriefNewsData, BriefNewsFormSchema } from "@/schemas";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { createPortal } from "react-dom";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { ImagesUploader } from "../../../_components/ImagesUploader";
import { AlertCardWrapper } from "../common/alert-card-wrapper";
import { CardWrapper } from "../common/card-wrapper";
import { FormButton } from "../common/form-button";
import { ImageWrapper } from "../common/image-wrapper";
import ModalTable from "../common/ModalTable";

export function NewsDataTable() {
  const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [dataList, setDataList] = useState<BriefNewsData[]>([]);
  const [filteredData, setFilteredData] = useState<BriefNewsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [isAddingNews, setIsAddingNews] = useState<boolean>(false);
  const [isEditingNews, setIsEditingNews] = useState<boolean>(false);

  const [report, setReport] = useState<any>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { startUpload } = useUploadThing("imagesUploader");
  const startDateTimeLocalNow = new Date();
  // new Date().getTime() - new Date().getTimezoneOffset() * 60_000
  const endDateTimeLocalNow = new Date();
  // new Date().getTime() - new Date().getTimezoneOffset() * 60_000
  // .toISOString().slice(0, 16);

  const form = useForm<z.infer<typeof BriefNewsFormSchema>>({
    resolver: zodResolver(BriefNewsFormSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
    },
  });

  const onSubmit = (values: z.infer<typeof BriefNewsFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      let uploadedNewsImageUrls = values.images;
      let newImages = [""];

      if (imageFiles.length > 0) {
        const uploadedImages = await startUpload(imageFiles);

        if (!uploadedImages) {
          return;
        }
        // console.log("Image file url================, ", uploadedImages[0]);

        await uploadedImages.map((imgFile: any) => {
          newImages.push(imgFile.url);
        });

        uploadedNewsImageUrls = newImages;
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
      const data = await news();
      setDataList(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setFilteredData(dataList);

      const rep: any = dataList?.map((dat: BriefNewsData) => {
        return {
          ID: dat.key,
          Title: dat.title,
          Details: dat.description,
          Images: JSON.stringify(dat.images),
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
        headerLabel={type === "CREATE" ? "Create New News" : "Update News"}
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
                      <FormLabel>News Title</FormLabel>
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
                      <FormLabel>News Details</FormLabel>
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
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Cover Image</FormLabel>
                      <FormControl>
                        <ImagesUploader
                          onFieldChange={field.onChange}
                          imageUrls={field.value}
                          setFiles={setImageFiles}
                          isError={form.formState.errors.images ? true : false}
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

  const HandleImagePreview = ({
    singleData,
  }: {
    singleData?: BriefNewsData;
  }) => {
    return (
      <ImageWrapper
      // subHeaderLabel="Welcome back"
      >
        <Carousel
          plugins={[plugin.current]}
          className="w-[260px] xs:w-[300px] sm:w-[340px]"
          // onMouseEnter={plugin.current.stop}
          // onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {singleData?.images?.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative w-[260px] xs:w-[300px] sm:w-[340px] h-[260px] xs:h-[300px] sm:h-[340px] flex items-center">
                  {img ? (
                  <Image
                    src={img}
                    fill
                    alt="image"
                    className="object-cover lg:object-cover bg-no-repeat"
                  />
                  ) : (
                      <div className="bg-[var(--clr-secondary)] text-[var(--clr-primary)] flex items-center justify-center w-full h-full">
              <h1 className="text-4xl font-bold">
                {singleData?.title?.split("")?.shift()?.toUpperCase()}
              </h1>
            </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" ml-14" />
                <CarouselNext className=" mr-14" />
        </Carousel>


        {/* <div className="relative w-[260px] xs:w-[300px] sm:w-[340px] h-[260px] xs:h-[300px] sm:h-[340px] flex items-center justify-center !rounded-xl">
          {singleData?.images[0] ? (
            <Image
              src={singleData?.images[0]}
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
        </div> */}
      </ImageWrapper>
    );
  };

  const columns: TableColumn<BriefNewsData>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "80px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "News Image",
        width: "120px",
        cell: (row: any) => (
          <FormButton
            asChild
            Form={() => HandleImagePreview({ singleData: row })}
          >
            <div className="cursor-pointer">
              <Avatar className="w-[45px] h-[45px] relative">
                <AvatarImage src={row?.images[0] || ""} />
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
            <div onClick={() => editNews(row)} className="flex gap-6">
              <ToolTip tooltip="Edit News">
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
    setIsAddingNews(false);
    setIsEditingNews(false);
  };

  const addNews = () => {
    // form.setValue("title", "");
    // form.setValue("information", "");
    // form.setValue("image", "");
    form.reset();
    setIsAddingNews(true);
  };

  const editNews = (news: BriefNewsData) => {
    form.setValue("title", news?.title);
    form.setValue("description", news?.description);
    form.setValue("images", news?.images);

    setIsEditingNews(true);
  };

  return (
    <>
      {isAddingNews &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{HandleForm({ type: "CREATE" })}</div>
          </ModalForm>,
          document.body
        )}

      {isEditingNews &&
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
            reportFilename="News"
            addButtonTitle="Add News"
            isAdd={true}
            addModal={addNews}
          />
        </div>
        {/* </CardContent>
      </Card> */}
      </div>
    </>
  );
}
