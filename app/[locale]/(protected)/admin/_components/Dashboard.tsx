"use client";
import DynamicIcons from "@/components/common/DynamicIcons";
import ToolTip from "@/components/common/ToolTip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AnalyticsData from "@/data/analytics";
import { alumniList } from "@/lib/users";
import { cn } from "@/lib/utils";
import { ProfileData } from "@/schemas";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { Chart } from "react-google-charts";
import { ImSpinner2 } from "react-icons/im";
import { MdVerifiedUser } from "react-icons/md";
import { HandleConfirmPrompt } from "./common/AlertComponent";
import TableDashboard from "./common/TableDashboard";
import { AlertButton } from "./common/alert-button";
import { FormButton } from "./common/form-button";
import { ImageWrapper } from "./common/image-wrapper";

export const data = [
  ["Country", "Popularity"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700],
];

export const data1 = [
  ["Continent", "Number"],
  ["Africa", 200],
  ["Asia", 300],
  ["America", 400],
  ["Europe", 500],
  ["Australia", 600],
];

// const data = [
//   { name: "Jan", ["Total Value"]: 400, color: "#1b81c2" },
//   { name: "Feb", ["Total Value"]: 300, color: "#218630" },
//   { name: "Mar", ["Total Value"]: 300, color: "#2622ae" },
//   { name: "Apr", ["Total Value"]: 200, color: "#5b26f5" },
// ];
export const options = {
  // title: "Number Per Continents",
  is3D: true,
};

export const options1 = {
  minColor: "#0d0",
  midColor: "#0d0",
  maxColor: "#0d0",
  headerHeight: 20,
  fontColor: "black",
  showScale: true,
  generateTooltip: (_row: any, _size: any, value: string) => {
    return (
      '<div style="background:var(--clr-silver-v6); padding:10px; border-style:solid; border-radius:8px"> ' +
      _size +
      "</div>"
    );
  },
};

const font = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const font1 = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

// interface DashboardProps {
//   alumniListData?: ProfileData[];
//   pageCount?: number;
//   loading: boolean;
// }

const DashboardComponent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [alumniListData, setAlumniListData] = useState<ProfileData[]>([]);
  const [filteredData, setFilteredData] = useState<ProfileData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const data = await alumniList();
      setAlumniListData(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setFilteredData(alumniListData);
    };
    getData();
  }, [alumniListData]);

  useEffect(() => {
    let result = alumniListData;
    if (q && q.length > 3) {
      result = alumniListData.filter((data: any) => {
        return (
          data.bio.country.toLowerCase().includes(q.toLowerCase()) ||
          data.bio.name.toLowerCase().includes(q.toLowerCase()) ||
          data.bio.email.toLowerCase().includes(q.toLowerCase())
        );
      });
    }
    setFilteredData(result);
  }, [q]);

  const HandleImagePreview = ({ singleData }: { singleData?: ProfileData }) => {
    return (
      <ImageWrapper
      // subHeaderLabel="Welcome back"
      >
        <div className="relative w-[260px] xs:w-[300px] sm:w-[340px] h-[260px] xs:h-[300px] sm:h-[340px] flex items-center justify-center !rounded-xl">
          {singleData?.bio.image ? (
            <Image
              src={singleData?.bio.image}
              alt="-"
              fill
              className="object-cover object-center !rounded-xl"
            />
          ) : (
            <div className="bg-[var(--clr-secondary)] text-[var(--clr-primary)] flex items-center justify-center w-full h-full">
              <h1 className="text-4xl font-bold">
                {singleData?.bio?.name?.split("")?.shift()?.toUpperCase()}
              </h1>
            </div>
          )}
        </div>
      </ImageWrapper>
    );
  };

  const columns: TableColumn<ProfileData>[] = useMemo(
    () => [
      {
        name: "ID",
        width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "Profile",
        width: "100px",
        cell: (row: any) => (
          <FormButton
            asChild
            Form={() => HandleImagePreview({ singleData: row })}
          >
            <div className="cursor-pointer">
              <Avatar className="w-[38px] h-[38px] relative">
                <AvatarImage src={row?.bio?.image || ""} />
                <AvatarFallback className="bg-[var(--clr-secondary)] text-[var(--clr-primary)]">
                  {row?.bio?.name?.split("")?.shift()?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </FormButton>
        ),
      },
      {
        name: "Name",
        minWidth: "300px",
        // width: "300px",
        cell: (row: any) => row?.bio?.name,
      },
      {
        name: "Phone Number",
        // minWidth: "300px",
        width: "200px",
        cell: (row: any) => row?.bio?.phoneNumber,
      },
      {
        name: "Email",
        cell: (row: any) => row?.bio?.email,
        width: "250px",
      },
      {
        name: "Country",
        width: "150px",
        cell: (row: any) => row?.bio?.country,
      },

      {
        name: "Status",
        width: "150px",
        cell: (row: any) => row?.status,
        //   selector: (row) => (row?.status ? "Active" : "Inactive"),
        //   sortable: true,
        //   conditionalCellStyles: [
        //     {
        //       when: (row) => row?.status,
        //       style: {
        //         color: "green",
        //         "&:hover": {
        //           cursor: "pointer",
        //         },
        //       },
        //     },
        //     {
        //       when: (row) => !row?.status,
        //       style: {
        //         color: "red",
        //         "&:hover": {
        //           cursor: "pointer",
        //         },
        //       },
        //     },
        //   ],
      },
      {
        name: "Action",
        width: "80px",
        cell: (row: any) => (
          <div className="flex justify-center items-center">
            <div className="flex gap-6">
              <ToolTip tooltip="Verify">
                <AlertButton
                  asChild
                  Form={() =>
                    HandleConfirmPrompt({
                      alertText: `verify ${row.bio.name}`,
                    })
                  }
                  isAlert={true}
                >
                  <div>
                    <MdVerifiedUser
                      //   onClick={() => onDeactivateRole(row)}
                      className="text-green-600 text-xl cursor-pointer"
                    />
                  </div>
                </AlertButton>
              </ToolTip>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className=" flex flex-col  gap-4 w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap gap-[25px] mt-[25px] pb-[15px]">
        {AnalyticsData?.map((info, index) => {
          const color = [info?.color];
          return (
            <div
              key={index}
              className={`h-[100px] w-[100%] border shadow-md  rounded-[8px] bg-[var(--clr-primary)] border-l-[4px] flex gap-4 items-center justify-between px-[30px] cursor-pointer hover:shadow-lg hover:scale-[103%] transition-all duration-300 ease-out`}
              style={{ borderLeftColor: info?.color }}
            >
              <div>
                <h2 className=" text-[11px] leading-[17px] font-bold text-[var(--clr-black)]">
                  {info?.title}
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[var(--clr-black-light)] mt-[5px]">
                  {info?.value}
                </h1>
              </div>
              <div className="p-3 shadow-2xl rounded-full bg-slate-100 border border-[var(--clr-secondary-light)]">
                <DynamicIcons
                  name={info?.icon}
                  iconColor={info?.color}
                  // className=" text-2xl  cursor-pointer hover:text-3xl"
                  style={`text-3xl hover:scale-105 cursor-pointer`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col xl:flex-row w-[100%] gap-[20px]  ">
        <div className="flex flex-1 shadow-md border bg-[var(--clr-primary)] !overflow-hidden p-4 py-4 rounded-[10px]">
          <div className=" w-[100%] h-[100%] flex flex-col md:gap-2 xl:gap-6 !overflow-x-auto [&>div]:flex-shrink-0">
            <h1
              className={cn(
                " text-sm  text-[var(--clr-secondary)] font-bold ",
                font1.className
              )}
            >
              Number of Alumni per Country
            </h1>
            <div className="w-full h-[400px] xsm:h-[450px] sm:h-[500px] md:h-[540px] lg:[650px]">
              <Chart
                chartEvents={[
                  {
                    eventName: "select",
                    callback: ({ chartWrapper }) => {
                      const chart = chartWrapper.getChart();
                      const selection = chart.getSelection();
                      if (selection.length === 0) return;
                      const region = data[selection[0].row + 1];
                      console.log("Selected : " + region);
                    },
                  },
                ]}
                chartType="GeoChart"
                width={"100%"}
                height={"100%"}
                data={data}
                loader={
                  <div className="flex items-center justify-center w-full  h-[380px]">
                    <ImSpinner2 className="animate-spin h-12 w-12 text-[var(--clr-secondary)]" />
                  </div>
                }
              />
            </div>
          </div>
        </div>

        {/*  */}
        <div className="w-[100%] xl:w-[35%] xl:flex-col flex-col flex md:flex-row gap-[20px] ">
          <div className="p-4 shadow-md bg-[var(--clr-primary)] border xl:flex-col flex-col flex md:flex-row flex-1 rounded-[10px]">
            {/* <PieComponent /> */}
            <div className="xl:mb-4 md:mb-0 mb-4 flex-1">
              <h1
                className={cn(
                  " text-sm  text-[var(--clr-secondary)] font-bold ",
                  font1.className
                )}
              >
                Percentage of Alumni per Continent
              </h1>
              <Chart
                chartType="PieChart"
                data={data1}
                options={options}
                width={"100%"}
                height={"250px"}
                loader={
                  <div className="flex items-center justify-center w-full  h-[200px]">
                    <ImSpinner2 className="animate-spin h-12 w-12 text-[var(--clr-secondary)]" />
                  </div>
                }
              />
            </div>

            <div className="flex-1">
              <h1
                className={cn(
                  " text-sm  text-[var(--clr-secondary)] font-bold ",
                  font1.className
                )}
              >
                Percentage of Alumni per Country
              </h1>
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"250px"}
                loader={
                  <div className="flex items-center justify-center w-full  h-[200px]">
                    <ImSpinner2 className="animate-spin h-12 w-12 text-[var(--clr-secondary)]" />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <TableDashboard
          filteredData={filteredData}
          columns={columns}
          isLoading={isLoading}
          tableHeader={"New Alumni List"}
        />
      </div>
    </div>
  );
};

export default DashboardComponent;
