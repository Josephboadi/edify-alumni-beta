import { getcontinent } from "@/actions/continent";
import { ContinentDataTable } from "../_components/setups/Continent";

const Continent = async () => {
  const continentDataQuery = await getcontinent();
  return (
    <div className="">
      <ContinentDataTable continentDataQuery={continentDataQuery} />
    </div>
  );
};

export default Continent;
