import { getjobs } from "@/actions/jobs";
import { JobDataTable } from "../_components/Job";

const Job = async () => {
  let jobQueryData;
  try {
    jobQueryData = await getjobs();
  } catch (error) {
    jobQueryData = null;
  }
  return (
    <div className="">
      <JobDataTable jobQueryData={jobQueryData} />
    </div>
  );
};

export default Job;
