"use server";
import { auth, signOut } from "@/auth";
import { getSessionByID } from "@/data/session-id";
import { createUrl } from "@/lib/http";
import { ProcessScholarshipFormSchema, ScholarshipFormSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

const apiUrl = process.env.API_URL!;

export const addscholarship = async (
  values: z.infer<typeof ScholarshipFormSchema>,
  locale: any
) => {
  const authData = await auth();
  const existingToken = await getSessionByID(authData?.user?.id || "");
  const validatedFields = ScholarshipFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, country_id, infomation, cover_image_url } =
    validatedFields.data;
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
    .post(createUrl("/alumini/api/v1/scholarship/add"), {
      title,
      country_id,
      infomation,
      cover_image_url,
    })
    .catch((error) => {
      return { error: "Something went wrong adding new scholarship" };
    });

  if (result?.data?.status == 1) {
    const data = await getscholarships();
    if (data?.success) {
      return {
        success: "Scholarship added successfully!",
        data: data?.data,
      };
    } else {
      return { error: "Something went wrong adding new scholarship" };
    }
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong adding new scholarship" };
  }
};

export const updatescholarship = async (
  values: z.infer<typeof ScholarshipFormSchema>,
  locale: any,
  id: string
) => {
  const authData = await auth();
  const existingToken = await getSessionByID(authData?.user?.id || "");
  const validatedFields = ScholarshipFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, country_id, infomation, cover_image_url } =
    validatedFields.data;
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
    .post(createUrl("/alumini/api/v1/scholarship/update"), {
      scholarship_id: id,
      title,
      country_id,
      infomation,
      cover_image_url,
    })
    .catch((error) => {
      return { error: "Something went wrong updating scholarship" };
    });

  if (result?.data?.status == 1) {
    const data = await getscholarships();
    if (data?.success) {
      return {
        success: "Scholarship updated successfully!",
        data: data.data,
      };
    } else {
      return { error: "Something went wrong updating scholarship" };
    }
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong updating scholarship" };
  }
};

export const processscholarshipapplication = async (
  values: z.infer<typeof ProcessScholarshipFormSchema>,
  locale: any
) => {
  const authData = await auth();
  const existingToken = await getSessionByID(authData?.user?.id || "");
  const validatedFields = ProcessScholarshipFormSchema.safeParse(values);
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
    .post(createUrl("/alumini/api/v1/scholarship/process-application"), {
      application_id,
      processComment,
      status,
    })
    .catch((error) => {
      return {
        error: "Something went wrong processing this scholarship application",
      };
    });

  if (result?.data?.status == 1) {
    const data = await getsinglescholarship(result?.data?.data?.scholarship_id);
    if (data?.success) {
      return {
        success: "This application processed successfully!",
        data: data?.data,
      };
    } else {
      return {
        error: "Something went wrong processing this scholarship application",
      };
    }
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return {
      error: "Something went wrong processing this scholarship application",
    };
  }
};

export const getsinglescholarship = async (id: string) => {
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
    .get(createUrl(`/alumini/api/v1/scholarship/all/${id}`))
    .catch((error) => {
      return { error: "Something went wrong getting scholarship data" };
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
    return { error: "Something went wrong getting scholarship data" };
  }
};

export const getscholarships = async () => {
  const authData = await auth();
  const existingToken = await getSessionByID(authData?.user?.id || "");

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
    .get(createUrl("/alumini/api/v1/scholarship/all"))
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
