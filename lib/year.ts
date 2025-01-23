import YearData from "@/data/years.json";

export const year = async () => {
  const yearData = await YearData;

  return yearData;
};
