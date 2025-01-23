import { getsubregion } from "@/actions/sub-region";
import { RegionDataTable } from "../_components/setups/Region";

const Region = async () => {
  const subRegionDataQuery = await getsubregion();
  return (
    <div className="">
      <RegionDataTable subRegionDataQuery={subRegionDataQuery} />
    </div>
  );
};

export default Region;
