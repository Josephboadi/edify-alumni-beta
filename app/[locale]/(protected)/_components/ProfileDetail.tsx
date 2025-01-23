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

interface ProfileDetailProps {
  profileData?: Awaited<UserInfoData>;
  // profileData?: Awaited<UserInfoData>;
  loading: boolean;
}

const ProfileDetail = ({ profileData, loading }: ProfileDetailProps) => {
  return (
    <div className=" w-full !mb-5">
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
            <Card className=" w-full shadow-md !px-0 pt-3  rounded-[6px] border-none">
              <CardContent className="relative w-full px-3 sm:px-4 flex flex-col gap-2">
                <h1
                  className={cn(
                    " text-2xl  text-[var(--clr-secondary)] font-semibold ",
                    font1.className
                  )}
                >
                  B
                  <span
                    className={cn(
                      " text-lg  text-[var(--clr-secondary)] font-semibold ",
                      font1.className
                    )}
                  >
                    IO
                  </span>
                </h1>
                <div className="relative w-full  grid grid-cols-1 md:grid-cols-2 gap-2 px-1">
                  <div className="flex items-center justify-start gap-4 text-wrap">
                    <p
                      className={cn(
                        " text-sm  text-[var(--clr-black-light)] font-bold ",
                        font.className
                      )}
                    >
                      Name
                    </p>

                    <p
                      className={cn(
                        " text-sm text-[var(--clr-black-light)] font-normal ",
                        font.className
                      )}
                    >
                      {profileData?.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-start gap-4 text-wrap">
                    <p
                      className={cn(
                        " text-sm  text-[var(--clr-black-light)] font-bold ",
                        font.className
                      )}
                    >
                      Email
                    </p>

                    <p
                      className={cn(
                        " text-sm text-[var(--clr-black-light)] font-normal ",
                        font.className
                      )}
                    >
                      {profileData?.email}
                    </p>
                  </div>
                  <div className="flex items-center justify-start gap-4 text-wrap">
                    <p
                      className={cn(
                        " text-sm  text-[var(--clr-black-light)] font-bold ",
                        font.className
                      )}
                    >
                      Phone Number
                    </p>

                    <p
                      className={cn(
                        " text-sm text-[var(--clr-black-light)] font-normal ",
                        font.className
                      )}
                    >
                      {profileData?.phone_numbers}
                    </p>
                  </div>
                  <div className="flex items-center justify-start gap-4 text-wrap">
                    <p
                      className={cn(
                        " text-sm  text-[var(--clr-black-light)] font-bold ",
                        font.className
                      )}
                    >
                      Country
                    </p>

                    <p
                      className={cn(
                        " text-sm text-[var(--clr-black-light)] font-normal ",
                        font.className
                      )}
                    >
                      {profileData?.country?.country_name}
                    </p>
                  </div>
                  {/* <div className="flex items-center justify-start gap-4 text-wrap">
                      <p
                        className={cn(
                          " text-sm  text-[var(--clr-black-light)] font-bold ",
                          font.className
                        )}
                      >
                        Region
                      </p>

                      <p
                        className={cn(
                          " text-sm text-[var(--clr-black-light)] font-normal ",
                          font.className
                        )}
                      >
                        {profileData?.bio?.region}
                      </p>
                    </div> */}
                  <div className="flex items-center justify-start gap-4 text-wrap">
                    <p
                      className={cn(
                        " text-sm  text-[var(--clr-black-light)] font-bold ",
                        font.className
                      )}
                    >
                      Home Address
                    </p>

                    <p
                      className={cn(
                        " text-sm text-[var(--clr-black-light)] font-normal ",
                        font.className
                      )}
                    >
                      {profileData?.address}
                    </p>
                  </div>
                  {/* <div className="flex items-center justify-start gap-4 text-wrap">
                      <p
                        className={cn(
                          " text-sm  text-[var(--clr-black-light)] font-bold ",
                          font.className
                        )}
                      >
                        Postal Address
                      </p>

                      <p
                        className={cn(
                          " text-sm text-[var(--clr-black-light)] font-normal ",
                          font.className
                        )}
                      >
                        {profileData?.bio?.postalAddress}
                      </p>
                    </div> */}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="">
            <Card className=" w-full shadow-md !px-0 pt-3  rounded-[6px] border-none">
              <CardContent className="relative w-full px-3 sm:px-4 flex flex-col gap-2">
                <h1
                  className={cn(
                    " text-2xl  text-[var(--clr-secondary)] font-semibold ",
                    font1.className
                  )}
                >
                  E
                  <span
                    className={cn(
                      " text-lg  text-[var(--clr-secondary)] font-semibold ",
                      font1.className
                    )}
                  >
                    DUCATION
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
                            Institution Name
                          </TableHead>
                          <TableHead
                            className={cn(
                              " w-[100px] text-sm  text-[var(--clr-black-light)] font-bold ",
                              font.className
                            )}
                          >
                            Completion
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {profileData?.user_education?.map((edu, index) => (
                          <TableRow key={index}>
                            <TableCell
                              className={cn(
                                " text-sm  text-[var(--clr-black-light)] font-normal ",
                                font.className
                              )}
                            >
                              {edu?.school}
                            </TableCell>
                            <TableCell
                              className={cn(
                                " text-sm  text-[var(--clr-black-light)] font-normal ",
                                font.className
                              )}
                            >
                              {edu?.completionYear}
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
            <Card className=" w-full shadow-md !px-0 pt-3  rounded-[6 px] border-none">
              <CardContent className="relative w-full px-3 sm:px-4 flex flex-col gap-2">
                <h1
                  className={cn(
                    " text-2xl  text-[var(--clr-secondary)] font-semibold ",
                    font1.className
                  )}
                >
                  C
                  <span
                    className={cn(
                      " text-lg  text-[var(--clr-secondary)] font-semibold ",
                      font1.className
                    )}
                  >
                    ERTIFICATE(S)
                  </span>
                </h1>
                <div className="relative w-full  grid grid-cols-1 gap-2 px-1">
                  {profileData?.user_certificate.map((certificate, index) => (
                    <div
                      className="flex items-center justify-start gap-4 text-wrap"
                      key={index}
                    >
                      <p
                        className={cn(
                          " text-sm  text-[var(--clr-black-light)] font-semibold ",
                          font.className
                        )}
                      >
                        {certificate?.title}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="">
            <Card className=" w-full shadow-md !px-0 pt-3  rounded-[4px] border-none">
              <CardContent className="relative w-full px-3 sm:px-4 flex flex-col gap-2">
                <h1
                  className={cn(
                    " text-2xl  text-[var(--clr-secondary)] font-semibold ",
                    font1.className
                  )}
                >
                  E
                  <span
                    className={cn(
                      " text-lg  text-[var(--clr-secondary)] font-semibold ",
                      font1.className
                    )}
                  >
                    MPLOYMENT(S)
                  </span>
                </h1>

                <div className="w-full overflow-x-auto no-scrollbar">
                  <div className=" min-w-[460px] md:w-full">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[var(--clr-silver-v6)]">
                          <TableHead
                            className={cn(
                              " text-sm  text-[var(--clr-black-light)] font-bold ",
                              font.className
                            )}
                          >
                            Company
                          </TableHead>
                          <TableHead
                            className={cn(
                              " w-[100px] text-sm  text-[var(--clr-black-light)] font-bold ",
                              font.className
                            )}
                          >
                            Position
                          </TableHead>

                          <TableHead
                            className={cn(
                              " w-[120px] text-sm  text-[var(--clr-black-light)] font-bold ",
                              font.className
                            )}
                          >
                            Period
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {profileData?.user_employment?.map((emp, index) => (
                          <TableRow key={index}>
                            <TableCell
                              className={cn(
                                " text-sm  text-[var(--clr-black-light)] font-normal ",
                                font.className
                              )}
                            >
                              {emp.company}
                            </TableCell>
                            <TableCell
                              className={cn(
                                " text-sm  text-[var(--clr-black-light)] font-normal ",
                                font.className
                              )}
                            >
                              {emp.position}
                            </TableCell>

                            <TableCell
                              className={cn(
                                " text-sm  text-[var(--clr-black-light)] font-normal ",
                                font.className
                              )}
                            >
                              {emp.period}
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
        </section>
      )}
    </div>
  );
};

export default ProfileDetail;
