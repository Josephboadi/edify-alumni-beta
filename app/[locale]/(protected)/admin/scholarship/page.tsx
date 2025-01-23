import { getscholarships } from "@/actions/scholarships";
import { ScholarshipDataTable } from "../_components/Scholarship";

const Scholarship = async () => {
  const scholarshipDataQuery = await getscholarships();
  return (
    <div className="">
      <ScholarshipDataTable scholarshipDataQuery={scholarshipDataQuery} />
    </div>
  );
};

export default Scholarship;
