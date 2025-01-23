import { getschool } from "@/actions/school";
import { SchoolDataTable } from "../_components/setups/School";

const School = async () => {
  const schoolDataQuery = await getschool();
  return (
    <div className="">
      <SchoolDataTable schoolDataQuery={schoolDataQuery} />
    </div>
  );
};

export default School;
