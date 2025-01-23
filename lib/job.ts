import JobListData from "@/data/joblist.json";

export const jobList = async (q: string, page: number) => {
  const ITEM_PER_PAGE = 4;
  try {
    let jobData = await JobListData;

    if (q.length > 3) {
      jobData = jobData.filter(
        (job) => job.title.toLowerCase().includes(q.toLowerCase())
        // job.List.every(({ title }) => {
        //   return title.toLowerCase().includes(q.toLowerCase());
        // })
      );
    }
    console.log(jobData?.length);
    console.log(ITEM_PER_PAGE);
    const pageCount = Math.ceil(jobData?.length / ITEM_PER_PAGE);
    console.log(pageCount);
    console.log(page);
    const skip = (page - 1) * ITEM_PER_PAGE;
    console.log(skip);
    jobData = jobData?.slice(skip, skip + ITEM_PER_PAGE);
    console.log(jobData);

    const jobsData = await jobData;

    return { pageCount, jobsData };
  } catch (error) {
    throw new Error("Failed to discussions data!");
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
