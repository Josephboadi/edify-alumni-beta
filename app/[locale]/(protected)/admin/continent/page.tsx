import { getcontinent } from "@/actions/continent";
import { ContinentDataTable } from "../_components/setups/Continent";

const Continent = async () => {
  let continentQueryData;
  try {
    continentQueryData = await getcontinent();
  } catch (error) {
    continentQueryData = null;
  }

  return (
    <div className="">
      <ContinentDataTable continentQueryData={continentQueryData} />
    </div>
  );
};

export default Continent;
