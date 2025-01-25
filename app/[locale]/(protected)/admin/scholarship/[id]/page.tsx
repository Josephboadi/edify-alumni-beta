import { getsinglescholarship } from "@/actions/scholarships";
import { ScholarshipApplications } from "../../_components/ScholarshipApplications";

const ScholarshipDetail = async ({ params }: any) => {
  let scholarshipDetailQueryData;
  try {
    scholarshipDetailQueryData = await getsinglescholarship(params.id);
  } catch (error) {
    scholarshipDetailQueryData = null;
  }
  return (
    <div>
      <ScholarshipApplications
        scholarshipDetailQueryData={scholarshipDetailQueryData}
      />
    </div>
  );
};

export default ScholarshipDetail;
