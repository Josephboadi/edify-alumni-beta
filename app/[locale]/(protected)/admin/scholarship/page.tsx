import { getscholarships } from "@/actions/scholarships";
import { ScholarshipDataTable } from "../_components/Scholarship";

const Scholarship = async () => {
  let scholarshipQueryData;
  try {
    scholarshipQueryData = await getscholarships();
  } catch (error) {
    scholarshipQueryData = null;
  }
  return (
    <div className="">
      <ScholarshipDataTable scholarshipQueryData={scholarshipQueryData} />
    </div>
  );
};

export default Scholarship;
