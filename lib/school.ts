import SchoolData from "@/data/almamata.json";

export const school = async () => {
  const schoolData = await SchoolData;

  return schoolData;
};
