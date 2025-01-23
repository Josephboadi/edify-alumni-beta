import AlumniListData from "@/data/alumnilist.json";

export const alumniList = async () => {
  try {
    let alumniData = await AlumniListData;
    return alumniData;
  } catch (error) {
    throw new Error("Failed to get alumni data!");
  }
};
