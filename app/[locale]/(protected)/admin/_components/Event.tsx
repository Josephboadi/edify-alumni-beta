"use client";

import ToolTip from "@/components/common/ToolTip";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFieldArray, useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import * as z from "zod";
import Breadcrump from "./common/Breadcrump";

// import { CardWrapper } from "@/components/auth/card-wrapper";
import ModalForm from "@/components/common/Modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { eventsList } from "@/lib/eventlist";
import { useUploadThing } from "@/lib/uploadthing";
import { EventData, EventFormSchema } from "@/schemas";
import moment from "moment";
import Image from "next/image";
import { createPortal } from "react-dom";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { ImageUploader } from "../../_components/ImageUploader";
import { AlertCardWrapper } from "./common/alert-card-wrapper";
import { CardWrapper } from "./common/card-wrapper";
import { FormButton } from "./common/form-button";
import { ImageWrapper } from "./common/image-wrapper";
import ModalTable from "./common/ModalTable";

export function EventDataTable() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [dataList, setDataList] = useState<EventData[]>([]);
  const [filteredData, setFilteredData] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [isAddingEvent, setIsAddingEvent] = useState<boolean>(false);
  const [isEditingEvent, setIsEditingEvent] = useState<boolean>(false);

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

  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      title: "",
      information: "",
      eventLocation: "",
      image: "",
      eventStartTime: startDateTimeLocalNow,
      eventEndTime: endDateTimeLocalNow,
      eventDate: new Date(),
      hashTags: [{ hash: "" }],
      isEventDay: false,
    },
  });

  const control = form.control;

  const eventHashTagsArray = useFieldArray({
    name: "hashTags",
    control,
    //  rules: {
    //    required: "Please append at least 1 Job Specification",
    //  },
  });

  const onSubmit = (values: z.infer<typeof EventFormSchema>) => {
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
      const data = await eventsList();
      setDataList(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setFilteredData(dataList);

      const rep: any = dataList?.map((dat: EventData) => {
        return {
          ID: dat.key,
          Title: dat.title,
          Information: dat.information,
          Image: dat.image,
          "Event Start": dat.eventStartTime,
          "Event End": dat.eventEndTime,
          "Event Date": dat.eventDate,
          Location: dat.eventLocation,
          "Published Date": dat.publishDate,
          Hashtag: JSON.stringify(dat.hashTags),
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
          data?.information.toLowerCase().includes(q.toLowerCase()) ||
          data?.eventStartTime.toLowerCase().includes(q.toLowerCase()) ||
          data?.eventEndTime.toLowerCase().includes(q.toLowerCase()) ||
          data?.publishDate.toString().includes(q.toString()) ||
          data?.eventDate.toString().includes(q.toString()) ||
          data?.eventLocation.toLowerCase().includes(q.toLowerCase())
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
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
                  name="information"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scholarship Information</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="Type Additional Notes Here."
                          className={`rounded-[6px]  !min-h-[100px] !max-h-[10vh] bg-[var(--clr-silver-v6)] placeholder:text-left ${
                            form.formState.errors.information
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
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Event Date:</FormLabel>
                      <FormControl>
                        <div
                          className={` relative flex item-center gap-1 justify-center pl-2  text-[var(--clr-secondary)] h-[40px] w-full bg-[var(--clr-silver-v6)] rounded-[6px] shadow-none ${
                            form.formState.errors.eventDate
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                        >
                          <Image
                            src="/assets/calendar.svg"
                            alt="calendar"
                            width={24}
                            height={24}
                            className="text-[var(--clr-secondary)]"
                          />
                          <DatePicker
                            selected={field.value}
                            onChange={(date: Date) => field.onChange(date)}
                            // showTimeSelect
                            // timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy"
                            wrapperClassName="w-full flex flex-1 h-full !py-2"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventStartTime"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Start Time:</FormLabel>
                      <FormControl>
                        <div
                          className={` relative flex item-center gap-1 justify-center pl-2  text-[var(--clr-secondary)] h-[40px] w-full bg-[var(--clr-silver-v6)] rounded-[6px] shadow-none ${
                            form.formState.errors.eventStartTime
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                        >
                          <Image
                            src="/assets/clock.svg"
                            alt="calendar"
                            width={24}
                            height={24}
                            className="filter-grey"
                          />
                          <DatePicker
                            selected={field.value}
                            onChange={(date: Date) => field.onChange(date)}
                            showTimeSelect
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            wrapperClassName="w-full flex flex-1 h-full !py-2"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventEndTime"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>End Time:</FormLabel>
                      <FormControl>
                        <div
                          className={` relative flex item-center gap-1 justify-center pl-2  text-[var(--clr-secondary)] h-[40px] w-full bg-[var(--clr-silver-v6)] rounded-[6px] shadow-none ${
                            form.formState.errors.eventEndTime
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                        >
                          <Image
                            src="/assets/clock.svg"
                            alt="calendar"
                            width={24}
                            height={24}
                            className="filter-grey"
                          />

                          <DatePicker
                            selected={field.value}
                            onChange={(date: Date) => field.onChange(date)}
                            showTimeSelect
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            wrapperClassName="w-full flex flex-1 h-full !py-2 "
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventLocation"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Event Location</FormLabel>
                      <FormControl>
                        <div
                          className={` relative flex item-center gap-1 justify-center pl-2 text-[var(--clr-secondary)] h-[40px] w-full bg-[var(--clr-silver-v6)] rounded-[6px] shadow-none ${
                            form.formState.errors.eventLocation
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                        >
                          <Image
                            src="/assets/location-grey.svg"
                            alt="calendar"
                            width={24}
                            height={24}
                            className="filter-grey"
                          />
                          <Input
                            placeholder="Event location or Online"
                            disabled={isPending}
                            {...field}
                            className="flex flex-1 h-full py-3 outline-none focus-visible:ring-transparent border-none"
                          />
                        </div>
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
                      <FormLabel>Upload Cover Image</FormLabel>
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

                <div>
                  <p className="text-[0.9rem] font-medium mb-2">Hashtags</p>
                  <div className=" space-y-2">
                    {eventHashTagsArray.fields.map((field, index) => {
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
                                    eventHashTagsArray.remove(index)
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
                          eventHashTagsArray.append({ hash: "" });
                          form.trigger("hashTags");
                        }}
                      >
                        <HiOutlinePlus className="text-lg text-[var(--clr-secondary)]" />
                        <span>Add New Hashtag</span>
                      </p>
                    </Button>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="isEventDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center flex-row-reverse">
                          <label
                            htmlFor="isEventDay"
                            className="flex-1 pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Is Event Day
                          </label>
                          <Checkbox
                            onCheckedChange={field.onChange}
                            checked={field.value}
                            id="isEventDay"
                            className="mr-2 h-5 w-5 border-2 border-primary-500"
                          />
                        </div>
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

  const HandleImagePreview = ({ singleData }: { singleData?: EventData }) => {
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

  const columns: TableColumn<EventData>[] = useMemo(
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
        cell: (row: any) => row?.information,
      },
      {
        name: "Event Date",
        width: "200px",
        cell: (row: any) => moment(new Date(row?.eventDate)).format("LL"),
      },

      {
        name: "Start Time",
        minWidth: "200px",
        cell: (row: any) => moment(new Date(row?.eventStartTime)).format("LT"),
      },
      {
        name: "End Time",
        minWidth: "200px",
        cell: (row: any) => moment(new Date(row?.eventEndTime)).format("LT"),
      },
      {
        name: "Event Location",
        minWidth: "200px",
        cell: (row: any) => row?.eventLocation,
      },
      {
        name: "Action",
        width: "140px",
        cell: (row) => (
          <div className="flex justify-center items-center">
            <div onClick={() => editEvent(row)} className="flex gap-6">
              <ToolTip tooltip="Edit Scholarship">
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
    setIsAddingEvent(false);
    setIsEditingEvent(false);
  };

  const addEvent = () => {
    // form.setValue("title", "");
    // form.setValue("information", "");
    // form.setValue("image", "");
    form.reset();
    setIsAddingEvent(true);
  };

  const editEvent = (event: EventData) => {
    form.setValue("hashTags", [...event?.hashTags]);
    form.setValue("title", event?.title);
    form.setValue("information", event?.information);
    form.setValue("image", event?.image);
    form.setValue("eventDate", new Date(event?.eventDate));
    form.setValue("eventStartTime", new Date(event?.eventDate));
    form.setValue("eventEndTime", new Date(event?.eventDate));
    form.setValue("eventLocation", event?.eventLocation);
    form.setValue("isEventDay", event?.isEventDay);

    setIsEditingEvent(true);
  };

  return (
    <>
      {isAddingEvent &&
        createPortal(
          <ModalForm closeModal={handleCloseButtonClick}>
            <div>{HandleForm({ type: "CREATE" })}</div>
          </ModalForm>,
          document.body
        )}

      {isEditingEvent &&
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
            addModal={addEvent}
          />
        </div>
        {/* </CardContent>
      </Card> */}
      </div>
    </>
  );
}
