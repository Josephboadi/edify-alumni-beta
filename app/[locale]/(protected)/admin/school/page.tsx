import { getschool } from "@/actions/school";
import { SchoolDataTable } from "../_components/setups/School";

const School = async () => {
  let schoolQueryData;
  try {
    schoolQueryData = await getschool();
  } catch (error) {
    schoolQueryData = null;
  }
  return (
    <div className="">
      <SchoolDataTable schoolQueryData={schoolQueryData} />
    </div>
  );
};

export default School;
