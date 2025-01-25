import { getsinglejob } from "@/actions/jobs";
import { JobApplications } from "../../_components/JobApplications";

const JobDetail = async ({ params }: any) => {
  let jobDetailQueryData;
  try {
    jobDetailQueryData = await getsinglejob(params.id);
  } catch (error) {
    jobDetailQueryData = null;
  }
  return (
    <div>
      <JobApplications jobDetailQueryData={jobDetailQueryData} />
    </div>
  );
};

export default JobDetail;
