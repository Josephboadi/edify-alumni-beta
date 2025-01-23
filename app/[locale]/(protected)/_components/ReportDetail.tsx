"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { profileData } from "@/data/profile";
import { cn } from "@/lib/utils";
import { UserInfoData } from "@/schemas";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
// import { useEffect, useState } from "react";

const font = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const font1 = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});
interface ReportDetailProps {
  profileData?: Awaited<UserInfoData>;
  loading: boolean;
}
const ReportDetail = ({ profileData, loading }: ReportDetailProps) => {
  return (
    <div className="  w-full !mb-5">
      {loading && (
        <section className=" !w-full  pb-5 flex flex-col gap-4">
          {[1, 2, 3, 4].map((el) => (
            <Skeleton
              className=" w-[260px] xs:w-[300px] sm:w-[380px] md:w-[620px] shadow-md !px-0 pt-3 h-[180px]  rounded-[4px] border-none"
              key={el}
            />
          ))}
        </section>
      )}
      {!loading && profileData && (
        <section className=" w-full  pb-5 flex flex-col gap-4">
          <div className="">
            <Card className=" w-full shadow-md !px-0 pt-3  rounded-[4px] border-none">
              <CardContent className="relative w-full px-3 sm:px-4 flex flex-col gap-2">
                <h1
                  className={cn(
                    " text-2xl  text-[var(--clr-secondary)] font-semibold ",
                    font1.className
                  )}
                >
                  S
                  <span
                    className={cn(
                      " text-lg  text-[var(--clr-secondary)] font-semibold ",
                      font1.className
                    )}
                  >
                    CHOLARSHIP(S)
                  </span>
                </h1>

                <div className="w-full overflow-x-auto no-scrollbar">
                  <div className=" w-[345px] md:w-full">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[var(--clr-silver-v6)]">
                          <TableHead
                            className={cn(
                              " text-sm  text-[var(--clr-black-light)] font-bold ",
                              font.className
                            )}
                          >
                            Institution
                          </TableHead>
                          <TableHead
                            className={cn(
                              " w-[100px] text-sm  text-[var(--clr-black-light)] font-bold ",
                              font.className
                            )}
                          >
                            Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {profileData?.scholarships?.map((sch, index) => (
                          <TableRow key={index}>
                            <TableCell
                              className={cn(
                                " text-sm  text-[var(--clr-black-light)] font-normal ",
                                font.className
                              )}
                            >
                              {sch?.scholarship?.title}
                            </TableCell>
                            <TableCell
                              className={cn(
                                " text-sm  text-[var(--clr-black-light)] font-normal ",
                                font.className
                              )}
                            >
                              {sch?.scholarship?.status}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="">
            <Card className=" w-full shadow-md !px-0 pt-3  rounded-[4px] border-none">
              <CardContent className="relative w-full px-3 sm:px-4 overflow-hidden flex flex-col gap-2">
                <h1
                  className={cn(
                    " text-2xl  text-[var(--clr-secondary)] font-semibold ",
                    font1.className
                  )}
                >
                  J
                  <span
                    className={cn(
                      " text-lg  text-[var(--clr-secondary)] font-semibold ",
                      font1.className
                    )}
                  >
                    OB
                  </span>{" "}
                  A
                  <span
                    className={cn(
                      " text-lg  text-[var(--clr-secondary)] font-semibold ",
                      font1.className
                    )}
                  >
                    PPLICATION(S)
                  </span>
                </h1>
                <div className="w-full overflow-x-auto no-scrollbar">
                  <div className=" w-[575px] md:w-full">
                    <Table className=" overflow-x-auto no-scrollbar">
                      <TableHeader>
                        <TableRow className="bg-[var(--clr-silver-v6)]">
                          <TableHead
                            className={cn(
                              "text-sm  text-[var(--clr-black-light)] font-bold ",
                              font.className
                            )}
                          >
                            Job Title
                          </TableHead>
                          <TableHead
                            className={cn(
                              "text-sm  text-[var(--clr-black-light)] font-bold ",
                              font.className
                            )}
                          >
                            Position
                          </TableHead>

                          <TableHead
                            className={cn(
                              " w-[180px] text-sm  text-[var(--clr-black-light)] font-bold ",
                              font.className
                            )}
                          >
                            Period
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {profileData?.job_applications?.map((jap, index) => (
                          <TableRow key={index}>
                            <TableCell
                              className={cn(
                                " text-sm  text-[var(--clr-black-light)] font-normal ",
                                font.className
                              )}
                            >
                              {jap?.job?.jobTitle}
                            </TableCell>
                            <TableCell
                              className={cn(
                                " text-sm  text-[var(--clr-black-light)] font-normal ",
                                font.className
                              )}
                            >
                              {jap?.job?.jobCategory}
                            </TableCell>

                            <TableCell
                              className={cn(
                                " text-sm  text-[var(--clr-black-light)] font-normal ",
                                font.className
                              )}
                            >
                              {jap?.job?.status}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* <div className="">
            <Card className=" w-full shadow-md !px-0 pt-3  rounded-[4px] border-none">
              <CardContent className="relative w-full px-3 sm:px-4 flex flex-col gap-2">
                <h1
                  className={cn(
                    " text-2xl  text-[var(--clr-secondary)] font-semibold ",
                    font1.className
                  )}
                >
                  S
                  <span
                    className={cn(
                      " text-lg  text-[var(--clr-secondary)] font-semibold ",
                      font1.className
                    )}
                  >
                    ERVICE(S)
                  </span>
                </h1>

                <div className="w-full overflow-x-auto no-scrollbar">
                  <div className=" w-[345px] md:w-full">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[var(--clr-silver-v6)]">
                          <TableHead
                            className={cn(
                              " text-sm  text-[var(--clr-black-light)] font-bold ",
                              font.className
                            )}
                          >
                            Service(s) Requested
                          </TableHead>
                          <TableHead
                            className={cn(
                              " w-[150px] text-sm  text-[var(--clr-black-light)] font-bold ",
                              font.className
                            )}
                          >
                            Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {profileData?.services?.map((serv, index) => (
                          <TableRow key={index}>
                            <TableCell
                              className={cn(
                                " text-sm  text-[var(--clr-black-light)] font-normal ",
                                font.className
                              )}
                            >
                              {serv.request}
                            </TableCell>
                            <TableCell
                              className={cn(
                                " text-sm  text-[var(--clr-black-light)] font-normal ",
                                font.className
                              )}
                            >
                              {serv.status}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </section>
      )}
    </div>
  );
};

export default ReportDetail;
