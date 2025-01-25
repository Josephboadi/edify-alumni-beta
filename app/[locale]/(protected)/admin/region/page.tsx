import { getsubregion } from "@/actions/sub-region";
import { RegionDataTable } from "../_components/setups/Region";

const Region = async () => {
  let regionQueryData;
  try {
    regionQueryData = await getsubregion();
  } catch (error) {
    regionQueryData = null;
  }
  return (
    <div className="">
      <RegionDataTable regionQueryData={regionQueryData} />
    </div>
  );
};

export default Region;
