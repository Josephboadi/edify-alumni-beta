import JobTypeData from "@/data/jobtype.json";

export const jobType = async () => {
  const jobTypeData = await JobTypeData;

  return jobTypeData;
};
