import { getsinglescholarship } from "@/actions/scholarships";
import { ScholarshipApplications } from "../../_components/ScholarshipApplications";

const ScholarshipDetail = async ({ params }: any) => {
  const scholarshipDetailsDataQuery = await getsinglescholarship(params.id);
  return (
    <div>
      <ScholarshipApplications
        scholarshipDetailsDataQuery={scholarshipDetailsDataQuery}
      />
    </div>
  );
};

export default ScholarshipDetail;
