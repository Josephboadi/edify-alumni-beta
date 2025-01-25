import { getcountry } from "@/actions/country";
import { CountryDataTable } from "../_components/setups/Country";

const Country = async () => {
  let countryQueryData;
  try {
    countryQueryData = await getcountry();
  } catch (error) {
    countryQueryData = null;
  }
  return (
    <div className="">
      <CountryDataTable countryQueryData={countryQueryData} />
    </div>
  );
};

export default Country;
