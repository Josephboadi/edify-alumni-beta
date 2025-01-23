import { getjobs } from "@/actions/jobs";
import { JobDataTable } from "../_components/Job";

const Job = async () => {
  const jobDataQuery = await getjobs();
  return (
    <div className="">
      <JobDataTable jobDataQuery={jobDataQuery} />
    </div>
  );
};

export default Job;
