"use client";

import ToolTip from "@/components/common/ToolTip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFieldArray, useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import * as z from "zod";
import Breadcrump from "./common/Breadcrump";

// import { CardWrapper } from "@/components/auth/card-wrapper";
import { addevent, updateevent } from "@/actions/event";
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
import { EventInfoData, NewEventFormSchema } from "@/schemas";
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

type NewEventFormValues = z.infer<typeof NewEventFormSchema>;

export function EventDataTable({ eventQueryData }: any) {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [dataList, setDataList] = useState<EventInfoData[]>([]);
  const [filteredData, setFilteredData] = useState<EventInfoData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [singleDataImage, setSingleDataImage] = useState<string>("");
  const [isAddingEvent, setIsAddingEvent] = useState<boolean>(false);
  const [isEditingEvent, setIsEditingEvent] = useState<boolean>(false);
  const { locale } = useParams();
  const [report, setReport] = useState<any>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [singleId, setSingleId] = useState<number>(0);
  const [eventId, setEventId] = useState<string>("");
  const [dateAdded, setDateAdded] = useState<string>("");
  const [infoStatus, setInfoStatus] = useState<number>(0);
  const [addedBy, setAddedBy] = useState<string>("");
  const { startUpload } = useUploadThing("imageUploader");
  const startDateTimeLocalNow = new Date();
  // new Date().getTime() - new Date().getTimezoneOffset() * 60_000
  const endDateTimeLocalNow = new Date();
  // new Date().getTime() - new Date().getTimezoneOffset() * 60_000
  // .toISOString().slice(0, 16);

  const form = useForm<NewEventFormValues>({
    defaultValues: {
      eventDate: new Date(),
      eventTitle: "",
      eventStartTime: startDateTimeLocalNow,
      eventEndTime: endDateTimeLocalNow,
      eventDescription: "",
      eventLocation: "",
      eventCoverImage: "",
      eventHashTag: [""],
      // isEventDay: false,
    },
    resolver: zodResolver(NewEventFormSchema),
  });

  const eventHashTagsArray = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "eventHashTag",
    rules: {
      required: "Please append at least 1 hash tag",
    },
  });

  const onSubmit = (values: z.infer<typeof NewEventFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      if (isAddingEvent) {
        // console.log(
        //   "Form data values===============================, ",
        //   values
        // );
        // console.log("Formatted Date==========================, ", moment(values.eventDate).format("YYYY-MM-DD"))
        // console.log("Formatted Time==========================, ", moment(values.eventStartTime).format("HH:mm:ss"))
        if (imageFiles.length > 0) {
          const uploadedImages = await startUpload(imageFiles);

          if (!uploadedImages) {
            return;
          }
          // console.log("Image file url================, ", uploadedImages[0]);

          const uploadedCoverImageUrl = uploadedImages[0].url;
          const data = {
            eventDate: moment(values.eventDate).format("YYYY-MM-DD"),
            eventTitle: values.eventTitle,
            eventStartTime: moment(values.eventStartTime).format("HH:mm:ss"),
            eventEndTime: moment(values.eventEndTime).format("HH:mm:ss"),
            eventDescription: values.eventDescription,
            eventLocation: values.eventLocation,
            eventCoverImage: uploadedCoverImageUrl,
            eventHashTag: values.eventHashTag,
          };
          addevent(data, locale)
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
      if (isEditingEvent) {
        const id = singleId;
        const event_id = eventId;
        const date_added = dateAdded;
        const status = infoStatus;
        const added_by_id = addedBy;

        if (singleDataImage && singleDataImage === values.eventCoverImage) {
          const data = {
            eventDate: moment(values.eventDate).format("YYYY-MM-DD"),
            eventTitle: values.eventTitle,
            eventStartTime: moment(values.eventStartTime).format("HH:mm:ss"),
            eventEndTime: moment(values.eventEndTime).format("HH:mm:ss"),
            eventDescription: values.eventDescription,
            eventLocation: values.eventLocation,
            eventCoverImage: values.eventCoverImage,
            eventHashTag: values.eventHashTag,
          };

          updateevent(
            data,
            locale,
            id,
            event_id,
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
              eventDate: moment(values.eventDate).format("YYYY-MM-DD"),
              eventTitle: values.eventTitle,
              eventStartTime: moment(values.eventStartTime).format("HH:mm:ss"),
              eventEndTime: moment(values.eventEndTime).format("HH:mm:ss"),
              eventDescription: values.eventDescription,
              eventLocation: values.eventLocation,
              eventCoverImage: uploadedCoverImageUrl,
              eventHashTag: values.eventHashTag,
            };
            updateevent(
              data,
              locale,
              id,
              event_id,
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
      // const data = await getevents();
      if (eventQueryData) {
        if (eventQueryData?.success) {
          setDataList(eventQueryData?.data);
          setIsLoading(false);
        } else if (eventQueryData?.error) {
          setDataList([]);
          setIsLoading(false);
          // setError(eventQueryData?.error);
          toast({
            title: "Error",
            description: eventQueryData.error,
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

      const rep: any = dataList?.map((dat: EventInfoData) => {
        return {
          ID: dat.id,
          Title: dat.eventTitle,
          "Event Details": dat.eventDescription,
          Image: dat.eventCoverImage,
          "Event Start": dat.eventStartTime,
          "Event End": dat.eventEndTime,
          "Event Date": dat.eventDate,
          Location: dat.eventLocation,
          "Published Date": dat.date_added,
          Hashtag: JSON.stringify(dat.eventHashTag),
        };
      });
      setReport(rep);
    };
    getData();
  }, [dataList]);

  useEffect(() => {
    let result = dataList;
    if (q && q.length > 3) {
      result = dataList.filter((data: EventInfoData) => {
        return (
          data?.eventTitle.toLowerCase().includes(q.toLowerCase()) ||
          data?.eventDescription.toLowerCase().includes(q.toLowerCase()) ||
          data?.eventStartTime.toLowerCase().includes(q.toLowerCase()) ||
          data?.eventEndTime.toLowerCase().includes(q.toLowerCase()) ||
          data?.date_added.toString().includes(q.toString()) ||
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
            className="space-y-6 w-[260px] xs:w-[300px] sm:w-[340px] md:w-[500px] "
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="eventTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter event title"
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.eventTitle
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
                name="eventDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Details</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="Type Event Details Here."
                        className={`rounded-[6px]  !min-h-[100px] !max-h-[10vh] bg-[var(--clr-silver-v6)] placeholder:text-left ${
                          form.formState.errors.eventDescription
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
                          dateFormat="h:mm aa"
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
                          dateFormat="h:mm aa"
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
                name="eventCoverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Cover Image</FormLabel>
                    <FormControl>
                      <ImageUploader
                        onFieldChange={field.onChange}
                        imageUrl={field.value}
                        setFiles={setImageFiles}
                        isError={
                          form.formState.errors.eventCoverImage ? true : false
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <p className="text-[0.9rem] font-medium mb-2">Hash Tags</p>
                <div className=" space-y-2">
                  {eventHashTagsArray.fields.map((field, index) => {
                    const errorForField =
                      form.formState.errors?.eventHashTag?.[index];
                    return (
                      <div key={field.id} className="w-full flex flex-col">
                        <div className="flex flex-row items-end gap-2">
                          <div className="flex-1 !h-[38px] ">
                            <input
                              {...form.register(
                                `eventHashTag.${index}` as const
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
                                onClick={() => eventHashTagsArray.remove(index)}
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

                <p>{form.formState.errors.eventHashTag?.message}</p>
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
                        eventHashTagsArray.append("");
                        form.trigger("eventHashTag");
                      }}
                    >
                      <HiOutlinePlus className="text-lg text-[var(--clr-secondary)]" />
                      <span>Add New Hashtag</span>
                    </p>
                  </Button>
                </div>
              </div>

              {/* <FormField
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
                /> */}
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
    singleData?: EventInfoData;
  }) => {
    return (
      <ImageWrapper
      // subHeaderLabel="Welcome back"
      >
        <div className="relative w-[260px] xs:w-[300px] sm:w-[340px] h-[260px] xs:h-[300px] sm:h-[340px] flex items-center justify-center !rounded-xl">
          {singleData?.eventCoverImage ? (
            <Image
              src={singleData?.eventCoverImage}
              alt="-"
              fill
              className="object-cover object-center !rounded-xl"
            />
          ) : (
            <div className="bg-[var(--clr-secondary)] text-[var(--clr-primary)] flex items-center justify-center w-full h-full">
              <h1 className="text-4xl font-bold">
                {singleData?.eventTitle?.split("")?.shift()?.toUpperCase()}
              </h1>
            </div>
          )}
        </div>
      </ImageWrapper>
    );
  };

  const columns: TableColumn<EventInfoData>[] = useMemo(
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
                <AvatarImage src={row?.eventCoverImage || ""} />
                <AvatarFallback className="bg-[var(--clr-secondary)] text-[var(--clr-primary)]">
                  {row?.eventTitle?.split("")?.shift()?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </FormButton>
        ),
      },
      {
        name: "Title",
        minWidth: "300px",
        cell: (row: any) => row?.eventTitle,
      },
      {
        name: "Event Details",
        minWidth: "450px",
        cell: (row: any) => row?.eventDescription,
      },
      {
        name: "Event Date",
        width: "200px",
        cell: (row: any) => moment(new Date(row?.eventDate)).format("LL"),
      },
      {
        name: "Published Date",
        width: "200px",
        cell: (row: any) => moment(new Date(row?.date_added)).format("LL"),
      },
      {
        name: "Start Time",
        minWidth: "200px",
        // cell: (row: any) => moment(new Date(row?.eventStartTime)).format("LT"),
        cell: (row: any) => row?.eventStartTime,
      },
      {
        name: "End Time",
        minWidth: "200px",
        // cell: (row: any) => moment(new Date(row?.eventEndTime)).format("LT"),
        cell: (row: any) => row?.eventEndTime,
      },
      {
        name: "Event Location",
        minWidth: "200px",
        cell: (row: any) => row?.eventLocation,
      },
      // {
      //   name: "Total Bookings",
      //   minWidth: "200px",
      //   cell: (row: any) => row?.bookings?.length(),
      // },
      {
        name: "Action",
        width: "140px",
        cell: (row) => (
          <div className="flex justify-center items-center">
            <div onClick={() => editEvent(row)}>
              <ToolTip tooltip="Edit Event">
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

  const handleCloseButtonClickAddEdit = () => {
    setIsAddingEvent(false);
    setIsEditingEvent(false);
    setSingleId(0);
    setEventId("");
    setDateAdded("");
    setInfoStatus(0);
    setAddedBy("");
    setSingleDataImage("");
  };

  const handleCloseButtonClick = () => {
    // console.log("Close button Clicked");
    setIsAddingEvent(false);
    setIsEditingEvent(false);
  };

  const addEvent = () => {
    form.reset();

    setIsAddingEvent(true);
  };

  const editEvent = (event: EventInfoData) => {
    const date = new Date(event?.eventDate); // Event date
    const startTimeArray = event?.eventStartTime.split(":").map(Number);
    const endTimeArray = event?.eventEndTime.split(":").map(Number);

    const startt = date.setHours(
      startTimeArray[0],
      startTimeArray[1],
      startTimeArray[2],
      0
    );
    const endt = date.setHours(
      endTimeArray[0],
      endTimeArray[1],
      endTimeArray[2],
      0
    );

    form.setValue("eventHashTag", [...event?.eventHashTag]);
    form.setValue("eventDate", new Date(event?.eventDate));
    form.setValue("eventStartTime", new Date(startt));
    form.setValue("eventEndTime", new Date(endt));
    form.setValue("eventTitle", event?.eventTitle);
    form.setValue("eventDescription", event?.eventDescription);
    form.setValue("eventLocation", event?.eventLocation);
    form.setValue("eventCoverImage", event?.eventCoverImage);
    // form.setValue("isEventDay", event?.isEventDay);

    setSingleId(event?.id);
    setEventId(event?.event_id);
    setDateAdded(event?.date_added);
    setInfoStatus(event?.status);
    setAddedBy(event?.added_by_id);
    setSingleDataImage(event?.eventCoverImage);

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
            reportFilename="Events"
            addButtonTitle="Add Event"
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
