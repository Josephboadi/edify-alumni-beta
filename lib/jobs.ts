import JobListData from "@/data/joblist.json";
import { Job } from "@/schemas";

export const jobsList = async () => {
  try {
    let jobData = await JobListData;
    let jobListData: Job[] = [];

    await jobData.map((job: any) => {
      jobListData.push(job);
      // job.List.map((jobList) =>
      //   jobListData.push({ categoryName: job.categoryName, ...jobList })
      // );
    });

    const jobsData = await jobListData;

    return jobsData;
  } catch (error) {
    throw new Error("Failed to get jobs data!");
  }
};

export const singleJob = async (id: string) => {
  try {
    let jobData;
    let jobListData = await JobListData;

    jobListData.map((job) => {
      if (job.id === id) {
        jobData = job;
      }
      // job.List.map((data) => {
      //   if (data.id === id) {
      //     jobData = data;
      //   }
      // });
    });

    return { jobData };
  } catch (error) {
    throw new Error("Failed to jobs data!");
  }
};
