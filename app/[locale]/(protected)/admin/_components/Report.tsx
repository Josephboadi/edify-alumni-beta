"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Breadcrump from "./common/Breadcrump";

// import { CardWrapper } from "@/components/auth/card-wrapper";
import { getcontinent } from "@/actions/continent";
import { getcountry } from "@/actions/country";
import { getschool } from "@/actions/school";
import { getsubregion } from "@/actions/sub-region";
import DropdownContinent from "@/components/common/DropdownContinent";
import DropdownRCountry from "@/components/common/DropdownRCountry";
import DropdownRSchool from "@/components/common/DropdownRSchool";
import DropdownSubRegion from "@/components/common/DropdownSubRegion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { heroes } from "@/lib/hero";
import { DynamicReportFormSchema, HeroData } from "@/schemas";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { FormButton } from "./common/form-button";
import { ImageWrapper } from "./common/image-wrapper";
import ModalTable from "./common/ModalTable";
import { Continent } from "./setups/Continent";
import { Country } from "./setups/Country";
import { Region } from "./setups/Region";
import { School } from "./setups/School";

export function ReportDataTable() {
  const { toast } = useToast();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const ctn = searchParams.get("ctn") ? searchParams.get("ctn") : "";
  const ctr = searchParams.get("ctr") ? searchParams.get("ctr") : "";
  const subr = searchParams.get("subr") ? searchParams.get("subr") : "";
  const sch = searchParams.get("sch") ? searchParams.get("sch") : "";
  const [dataList, setDataList] = useState<HeroData[]>([]);
  const [filteredData, setFilteredData] = useState<HeroData[]>([]);
  const [continentData, setContinentData] = useState<Continent[]>([]);
  const [subRegionData, setSubRegionData] = useState<Region[]>([]);
  const [countryData, setCountryData] = useState<Country[]>([]);
  const [schoolData, setSchoolData] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [isAddingHero, setIsAddingHero] = useState<boolean>(false);
  const [isEditingHero, setIsEditingHero] = useState<boolean>(false);

  const [report, setReport] = useState<any>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DynamicReportFormSchema>>({
    resolver: zodResolver(DynamicReportFormSchema),
    defaultValues: {
      continent: "",
      subRegion: "",
      country: "",
      school: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof DynamicReportFormSchema>) => {
    setError("");
    setSuccess("");

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
      const data = await heroes();
      setDataList(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await getcountry();
      if (data?.success) {
        setCountryData(data?.data);
      }
      if (data?.error) {
        setCountryData([]);
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await getcontinent();

      if (data?.success) {
        setContinentData(data?.data);
      }
      if (data?.error) {
        setContinentData([]);
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
    };
    getData();
  }, []);

  useEffect(() => {
    // setIsLoading(true);
    const getData = async () => {
      const data = await getsubregion();
      if (data?.success) {
        setSubRegionData(data?.data);
        // setIsLoading(false);
      }
      if (data?.error) {
        setSubRegionData([]);
        // setIsLoading(false);
        // setError(data?.error);
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const data = await getschool();
      if (data?.success) {
        setSchoolData(data?.data);
        setIsLoading(false);
      }
      if (data?.error) {
        setSchoolData([]);
        setIsLoading(false);
        // setError(data?.error);
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      // setFilteredData(dataList);

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

  const HandleForm = () => {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Start Date:</FormLabel>
                  <FormControl>
                    <div
                      className={` relative flex item-center gap-1 justify-center pl-2  text-[var(--clr-secondary)] h-[40px] w-full bg-[var(--clr-silver-v6)] rounded-[6px] shadow-none ${
                        form.formState.errors.startDate
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
              name="endDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>End Date:</FormLabel>
                  <FormControl>
                    <div
                      className={` relative flex item-center gap-1 justify-center pl-2  text-[var(--clr-secondary)] h-[40px] w-full bg-[var(--clr-silver-v6)] rounded-[6px] shadow-none ${
                        form.formState.errors.endDate
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
              name="continent"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select Continent</FormLabel>
                  <FormControl>
                    <DropdownContinent
                      onChangeHandler={field.onChange}
                      value={field.value}
                      arrayData={continentData}
                      isError={form.formState.errors.continent ? true : false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subRegion"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select Sub Region</FormLabel>
                  <FormControl>
                    <DropdownSubRegion
                      onChangeHandler={field.onChange}
                      value={field.value}
                      arrayData={subRegionData}
                      isError={form.formState.errors.subRegion ? true : false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select Country</FormLabel>
                  <FormControl>
                    <DropdownRCountry
                      onChangeHandler={field.onChange}
                      value={field.value}
                      arrayData={countryData}
                      isError={form.formState.errors.country ? true : false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select School</FormLabel>
                  <FormControl>
                    <DropdownRSchool
                      onChangeHandler={field.onChange}
                      value={field.value}
                      arrayData={schoolData}
                      isError={form.formState.errors.school ? true : false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" flex items-end">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-[var(--clr-secondary)] "
              >
                Generate Report
              </Button>
            </div>
          </div>
          {/* <div className="!mb-4 !mt-6 !pt-4">
            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-[var(--clr-secondary)] "
            >
              Generate Report
            </Button>
          </div> */}
        </form>
      </Form>
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
            <div className="cursor-pointer py-2">
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
    ],
    []
  );

  return (
    <>
      <div className={`flex-1 flex flex-col  `}>
        <div className="fixed z-[20] bg-white w-full pb-2">
          <Breadcrump
            prePath={pathname.split("/")[1]}
            title={pathname.split("/")[2]}
          />
        </div>
        <Card className="w-full mt-20 ">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Dynamic Report</CardTitle>
          </CardHeader>
          <CardContent className="w-full ">
            <div className="mb-6">{HandleForm()}</div>
          </CardContent>
        </Card>
        <div className=" mt-6 flex justify-center ">
          <ModalTable
            filteredData={filteredData}
            columns={columns}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            report={report}
            reportFilename="DynamicReport"
          />
        </div>
      </div>
    </>
  );
}
