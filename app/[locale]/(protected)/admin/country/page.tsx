import { getcountry } from "@/actions/country";
import { CountryDataTable } from "../_components/setups/Country";

const Country = async () => {
  const countryDataQuery = await getcountry();
  return (
    <div className="">
      <CountryDataTable countryDataQuery={countryDataQuery} />
    </div>
  );
};

export default Country;
