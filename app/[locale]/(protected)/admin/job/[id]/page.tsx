import { getsinglejob } from "@/actions/jobs";
import { JobApplications } from "../../_components/JobApplications";

const JobDetail = async ({ params }: any) => {
  const jobDetailsDataQuery = await getsinglejob(params.id);
  return (
    <div>
      <JobApplications jobDetailsDataQuery={jobDetailsDataQuery} />
    </div>
  );
};

export default JobDetail;
