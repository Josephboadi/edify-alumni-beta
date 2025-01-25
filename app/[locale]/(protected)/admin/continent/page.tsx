import { getcontinent } from "@/actions/continent";
import { ContinentDataTable } from "../_components/setups/Continent";

const Continent = async () => {
  const continentQueryData = await getcontinent();
  return (
    <div className="">
      <ContinentDataTable continentQueryData={continentQueryData} />
    </div>
  );
};

export default Continent;
