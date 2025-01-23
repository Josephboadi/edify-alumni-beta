"use client";
// import { jobListData } from "@/data/joblist";
import { Button } from "@/components/ui/button";
import { Job } from "@/schemas";
import { useAppStore } from "@/store/store";
import moment from "moment";
import { useEffect } from "react";
import {
  MdOutlineBusinessCenter,
  MdOutlineLocationOn,
  MdOutlinePayments,
} from "react-icons/md";
import { PiToolboxBold } from "react-icons/pi";
import { JobApplicationButton } from "./jobapplicationform/jobapplication-button";

const SingleJob = ({ jobData }: { jobData: Job }) => {
  const { setJobInfoData, open, setOpen } = useAppStore();
  // const [open, setOpen] = useState<boolean>(false);
  // setJobInfoData(jobData);
  // const params = useParams();
  // const [jobData, setJobData] = useState<Job>();

  useEffect(() => {
    setJobInfoData(jobData);

    return;
  }, []);

  const handleOpenForm = async () => {
    await setJobInfoData(jobData);
    setOpen();
  };

  return (
    <>
      {/* {open && <JobApplication />} */}
      <div className=" w-full">
        {jobData && (
          <div className="md:px-10 xl:px-14 w-full">
            <div>
              <p className=" text-xl font-bold mb-2">{jobData?.title}</p>
            </div>
            <div className=" flex gap-4 items-end">
              <div className="flex flex-col flex-1">
                <div className="px-1 py-2  rounded-[5px] flex items-center gap-3">
                  <MdOutlineBusinessCenter className="text-xl text-[var(--clr-jet)]" />
                  <p className="text-[var(--clr-jet)] text-sm font-semibold">
                    {jobData?.company}
                  </p>
                </div>
                <div className="px-1 py-2  rounded-[5px] flex items-center gap-3">
                  <MdOutlineLocationOn className="text-xl text-[var(--clr-jet)]" />
                  <p className="text-[var(--clr-jet)] text-sm font-semibold">
                    {jobData?.location}
                  </p>
                </div>
                <div className="px-1 py-2  rounded-[5px] flex items-center gap-3">
                  <MdOutlinePayments className="text-xl text-[var(--clr-jet)]" />
                  <p className="text-[var(--clr-jet)] text-sm font-semibold">
                    {jobData?.pay}
                  </p>
                </div>
                <div className="px-1 py-2  rounded-[5px] flex items-center gap-3">
                  {/* <MdOutlinePayments className="text-xl text-[var(--clr-jet)]" /> */}
                  <PiToolboxBold className="text-xl text-[var(--clr-jet)]" />
                  <p className="text-[var(--clr-jet)] text-sm font-semibold">
                    {jobData?.jobType}
                  </p>
                </div>
              </div>

              {/* <div className="mb-3 md:mr-8">
                <div
                  onClick={handleOpenForm}
                  className="flex items-center justify-center  !rounded-[6px]  bg-[var(--clr-green)] hover:shadow-lg w-[90px] h-8 cursor-pointer"
                >
                  <p className="text-sm font-medium text-[var(--clr-primary)]">
                    Apply
                  </p>
                </div>
              </div> */}

              <div className="mb-3 md:mr-8" onClick={handleOpenForm}>
                <JobApplicationButton asChild>
                  <Button
                    variant={"default"}
                    size={"sm"}
                    asChild
                    className="flex items-center justify-center  !rounded-[6px]  bg-[var(--clr-green)] w-[90px] h-8 "
                    // onClick={() => setJobData(jobData)}
                  >
                    <div className="flex items-center justify-center  !rounded-[6px]  bg-[var(--clr-green)] hover:shadow-lg w-[90px] h-8 cursor-pointer">
                      <p className="text-sm font-medium text-[var(--clr-primary)]">
                        Apply
                      </p>
                    </div>
                  </Button>
                </JobApplicationButton>
              </div>
            </div>
            <div>
              <p className=" mt-2 text-lg font-normal mb-5">
                {jobData?.information}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <div>
                  <p className=" font-semibold italic">Job Description</p>
                </div>
                {jobData?.jobDescription.map((jobd, index) => (
                  <div className="flex  gap-4" key={index}>
                    <div className="mt-2 min-w-[8px] w-[8px] max-w[8px] h-[8px] rounded-full bg-[var(--clr-green)]" />

                    <div className="flex flex-grow">
                      <p>{jobd.info}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <p className=" font-semibold italic">Job Specification</p>
                </div>
                {jobData?.jobSpecification.map((jobd, index) => (
                  <div className="flex  gap-4" key={index}>
                    <div className="mt-2 min-w-[8px] w-[8px] max-w[8px] h-[8px] rounded-full bg-[var(--clr-green)]" />

                    <div className="flex flex-grow">
                      <p>{jobd.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className=" mt-10 mb-4 border-t-[1px] w-full border-[var(--clr-primary-light)]" />
            <div className="flex  gap-10">
              <div className="flex flex-wrap flex-1 items-center gap-3">
                <div>
                  <p className=" text-xl text-[var(--clr-jet-v1)]">
                    {moment(jobData?.publishDate, "YYYYMMDD").fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleJob;
