"use server";
import { auth, signOut } from "@/auth";
import { getSessionByID } from "@/data/session-id";
import { createUrl } from "@/lib/http";
import { NewJobFormSchema, ProcessJobFormSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

const apiUrl = process.env.API_URL!;

export const addjob = async (
  values: z.infer<typeof NewJobFormSchema>,
  locale: any
) => {
  const authData = await auth();
  const existingToken = await getSessionByID(authData?.user?.id || "");
  const validatedFields = NewJobFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    jobTitle,
    jobCategory,
    jobType,
    country_id,
    minimumSalary,
    maximumSalary,
    location,
    infomation,
    description,
    sepcification,
    salaryCurrency,
  } = validatedFields.data;
  axios.interceptors.request.use(
    (config) => {
      const { origin } = new URL(config.url!);
      const allowedOrigins = [apiUrl];
      if (allowedOrigins.includes(origin)) {
        config.headers.tokenID = `${existingToken?.token}`;
      }
      console.log(config);
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  const result: any = await axios
    .post(createUrl("/alumini/api/v1/Job/addJob"), {
      jobTitle,
      jobCategory,
      jobType,
      country_id,
      minimumSalary,
      maximumSalary,
      location,
      infomation,
      description,
      sepcification,
      salaryCurrency,
    })
    .catch((error) => {
      return { error: "Something went wrong adding new job" };
    });

  if (result?.data?.status == 1) {
    const data = await getjobs();
    if (data?.success) {
      return {
        success: "Job added successfully!",
        data: data?.data,
      };
    } else {
      return { error: "Something went wrong adding new job" };
    }
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong adding new job" };
  }
};

export const updatejob = async (
  values: z.infer<typeof NewJobFormSchema>,
  locale: any,
  id: string
) => {
  const authData = await auth();
  const existingToken = await getSessionByID(authData?.user?.id || "");
  const validatedFields = NewJobFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    jobTitle,
    jobCategory,
    jobType,
    country_id,
    minimumSalary,
    maximumSalary,
    location,
    infomation,
    description,
    sepcification,
    salaryCurrency,
  } = validatedFields.data;
  axios.interceptors.request.use(
    (config) => {
      const { origin } = new URL(config.url!);
      const allowedOrigins = [apiUrl];
      if (allowedOrigins.includes(origin)) {
        config.headers.tokenID = `${existingToken?.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const result: any = await axios
    .post(createUrl("/alumini/api/v1/Job/updateJob"), {
      job_id: id,
      jobTitle,
      jobCategory,
      jobType,
      country_id,
      minimumSalary,
      maximumSalary,
      location,
      infomation,
      description,
      sepcification,
      salaryCurrency,
    })
    .catch((error) => {
      return { error: "Something went wrong updating job" };
    });

  if (result?.data?.status == 1) {
    const data = await getjobs();
    if (data?.success) {
      return {
        success: "Job updated successfully!",
        data: data.data,
      };
    } else {
      return { error: "Something went wrong updating job" };
    }
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong updating job" };
  }
};

export const processjobapplication = async (
  values: z.infer<typeof ProcessJobFormSchema>,
  locale: any
) => {
  const authData = await auth();
  const existingToken = await getSessionByID(authData?.user?.id || "");
  const validatedFields = ProcessJobFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { application_id, processComment, status } = validatedFields.data;
  axios.interceptors.request.use(
    (config) => {
      const { origin } = new URL(config.url!);
      const allowedOrigins = [apiUrl];
      if (allowedOrigins.includes(origin)) {
        config.headers.tokenID = `${existingToken?.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const result: any = await axios
    .post(createUrl("/alumini/api/v1/Job/process-application"), {
      application_id,
      processComment,
      status,
    })
    .catch((error) => {
      return { error: "Something went wrong processing this job application" };
    });

  if (result?.data?.status == 1) {
    const data = await getsinglejob(result?.data?.data?.job_id);
    if (data?.success) {
      return {
        success: "This application processed successfully!",
        data: data?.data,
      };
    } else {
      return { error: "Something went wrong processing this job application" };
    }
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong processing this job application" };
  }
};

export const getsinglejob = async (id: string) => {
  const authData = await auth();
  const existingToken = await getSessionByID(authData?.user?.id || "");

  if (!id) {
    return { error: "User id is required!" };
  }

  axios.interceptors.request.use(
    (config) => {
      const { origin } = new URL(config.url!);
      const allowedOrigins = [apiUrl];
      if (allowedOrigins.includes(origin)) {
        config.headers.tokenID = `${existingToken?.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const result: any = await axios
    .get(createUrl(`/alumini/api/v1/Job/all/${id}`))
    .catch((error) => {
      return { error: "Something went wrong getting job data" };
    });

  if (result?.data?.status == 1) {
    return {
      success: "successful!",
      data: result?.data?.data,
    };
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong getting job data" };
  }
};

export const getjobs = async () => {
  const authData = await auth();
  const existingToken = await getSessionByID(authData?.user?.id || "");

  axios.interceptors.request.use(
    (config) => {
      const { origin } = new URL(config.url!);
      const allowedOrigins = [apiUrl];
      if (allowedOrigins.includes(origin)) {
        config.headers.tokenID = `${existingToken?.token}`;
      }
      console.log(config);
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  const result: any = await axios
    .get(createUrl("/alumini/api/v1/Job/all"))
    .catch((error) => {
      return { error: "Error getting data" };
    });

  if (result?.data?.status == 1) {
    return {
      success: "successful!",
      data: result?.data?.data,
    };
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return { error: "Error getting data" };
  }
};
