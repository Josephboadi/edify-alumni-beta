import ScholarshipListData from "@/data/scholarshiplist.json";

export const scholarShips = async () => {
  try {
    let scholarshipData = await ScholarshipListData;

    return scholarshipData;
  } catch (error) {
    throw new Error("Failed to scholarships data!");
  }
};
