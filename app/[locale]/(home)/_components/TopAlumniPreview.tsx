import { Header } from "@/components/auth/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppStore } from "@/store/store";
import Image from "next/image";

const TopAlumniPreview = () => {
  const { alumniInfoData } = useAppStore();
  return (
    <div className="flex w-[320px] xs:w-[360px] sm:w-[400px] md:w-[700px]  border-none min-h-[520px] !rounded-xl">
      <Card className="w-full rounded-none h-full max-h-[76vh] md:max-h-[96vh] overflow-y-auto no-scrollbar flex flex-col justify-between bg-[var(--clr-primary)] relative">
        <CardHeader className="!bg-[var(--clr-primary)] sticky top-0 left-0 right-0 z-[1]">
          <Header label={"Alumni of the month"} />
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:px-6">
            <div className=" col-span-1 w-full relative h-[300px] sm:h-[400px]  md:h-[500px] bg-transparent border border-black p-4 ">
              <div className="w-full h-full relative ">
                <Image
                  src={alumniInfoData.image}
                  fill
                  alt="Image"
                  className=" object-fill object-center bg-no-repeat"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold text-left line-clamp-1">
                  {alumniInfoData?.name}
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-left line-clamp-1">
                    {alumniInfoData?.company}
                  </h1>
                  <p className="text-base text-left line-clamp-1 italic">
                    {alumniInfoData?.position}
                  </p>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <h1 className="text-lg font-bold text-left line-clamp-1">
                  BACKGROUND
                </h1>
                <p>
                  {alumniInfoData?.info} {alumniInfoData?.info}{" "}
                  {alumniInfoData?.info} {alumniInfoData?.info}{" "}
                </p>
              </div>

              <div className="flex flex-col mt-2">
                <h1 className="text-lg font-bold text-left line-clamp-1">
                  SUCCESS STORY
                </h1>
                <p>
                  {alumniInfoData?.info} {alumniInfoData?.info}{" "}
                  {alumniInfoData?.info} {alumniInfoData?.info}{" "}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopAlumniPreview;
