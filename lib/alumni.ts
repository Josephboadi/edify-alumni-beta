import AlumniData from "@/data/topalumni.json";

export const alumni = async () => {
  const alumniData = await AlumniData;

  return alumniData;
};
