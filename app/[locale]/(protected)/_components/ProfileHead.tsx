"use client";
import { Button } from "@/components/ui/button";
// import { profileData } from "@/data/profile";
import { cn } from "@/lib/utils";
import { UserInfoData } from "@/schemas";
import { Montserrat } from "next/font/google";
import Image from "next/image";
// import { useEffect, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
// import { TiUpload } from "react-icons/ti";
import { Skeleton } from "@/components/ui/skeleton";
import { AiOutlineCloudUpload } from "react-icons/ai";

const font = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

interface ProfileHeadProps {
  // profileData?: Awaited<ProfileData>;
  profileData?: Awaited<UserInfoData>;
  loading: boolean;
}

const ProfileHead = ({ profileData, loading }: ProfileHeadProps) => {
  // const [profileDetailData, setProfileDetailData] = useState<ProfileData>();

  // useEffect(() => {
  //   setProfileDetailData(profileData);
  //   return;
  // }, []);

  return (
    <>
      {loading && (
        <section className="w-full relative flex gap-4 items-end">
          <Skeleton className="w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] rounded-[10px] relative  shadow-md" />
          <div className="h-full flex justify-between gap-4 md:gap-14 items-end pb-1 flex-1">
            <div className="flex justify-start flex-1 flex-wrap">
              <Skeleton className="w-full sm:w-[300px] h-[26px] rounded-[4px]" />
            </div>
            <Skeleton className="  h-[36px] w-[36px] md:w-[100px] flex items-end rounded-[4px]"></Skeleton>
          </div>
        </section>
      )}
      {!loading && profileData && (
        <section className="w-full relative flex gap-4 items-end">
          <div className="w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] rounded-[10px] relative  shadow-md">
            <Image
              src={profileData?.image || "/profile.png"}
              fill
              alt="-"
              className="object-center rounded-[10px] object-cover "
            />
            <Button
              size={"icon"}
              variant={"ghost"}
              className=" absolute rounded-full w-7 h-7 shadow-lg -right-2 -bottom-2 bg-[var(--clr-primary)] flex items-center justify-center"
            >
              {/* <TiUpload /> */}
              <AiOutlineCloudUpload className="text-lg text-[var(--clr-secondary)]" />
            </Button>
          </div>

          <div className="h-full flex justify-between gap-4 items-end pb-1 flex-1">
            <div className="flex justify-start flex-1 flex-wrap">
              <h1
                className={cn(
                  " text-[14px] leading-[19px] xs:text-base xs:leading-[19px] sm:text-lg md:text-xl xl:text-2xl text-[var(--clr-secondary)] font-bold ",
                  font.className
                )}
              >
                {profileData.name}
              </h1>
            </div>
            <div className="  h-[36px] flex items-end ">
              <Button
                variant={"outline"}
                className="hidden md:flex px-5 h-full rounded-[6px] border-[var(--clr-secondary)] text-[var(--clr-secondary)] text-sm font-semibold bg-transparent items-center justify-center gap-2"
              >
                <RiEdit2Line className="text-[var(--clr-secondary)] text-xl" />
                Edit Profile
              </Button>

              <Button
                size={"icon"}
                variant={"outline"}
                className=" w-full flex items-center h-full justify-center  md:hidden rounded-[6px] border-[var(--clr-secondary)] text-[var(--clr-secondary)] text-sm font-semibold bg-transparent px-2"
              >
                <RiEdit2Line className="text-[var(--clr-secondary)] text-xl md:text-2xl xlt:ext-3xl" />
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProfileHead;
