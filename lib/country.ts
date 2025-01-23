import CountryData from "@/data/countries.json";

export const country = async () => {
  const countryData = await CountryData;

  return countryData;
};
