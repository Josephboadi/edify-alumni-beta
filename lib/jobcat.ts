import JobCatData from "@/data/jobcat.json";

export const jobCategories = async () => {
  const jobCatData = await JobCatData;

  return jobCatData;
};
