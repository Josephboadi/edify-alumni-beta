"use server";
import { createUrl } from "@/lib/http";
import { deleteSessionToken, generateSessionToken } from "@/lib/tokens";
import { SchoolSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

const apiUrl = process.env.API_URL!;

type Schools = {
  school_name: string;
  address: string;
  phone_numbers: string[];
  country_id: string;
};

export const addschool = async (
  values: z.infer<typeof SchoolSchema>,
  locale: any
) => {
  const existingToken = await generateSessionToken();

  // if (data.success) {
  const validatedFields = SchoolSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { school_name, address, country_id, phone_numbers } =
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

  let newcontact: any = [];
  await phone_numbers.map((phone: any) => {
    newcontact.push(phone.number);
  });

  const result: any = await axios
    .post(createUrl("/alumini/api/v1/setup/AddSchool"), {
      school_name,
      address,
      country_id,
      phone_numbers: newcontact,
    })
    .catch((error) => {
      return { error: "Something went wrong adding new school" };
    });

  if (result?.data?.status == 1) {
    const data = await getschool();
    if (data?.success) {
      return {
        success: "School added successfully!",
        data: data?.data,
      };
    } else {
      return { error: "Something went wrong adding new School" };
    }
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong adding new School" };
  }
};

export const addbatchschool = async (values: Schools[], locale: any) => {
  const existingToken = await generateSessionToken();

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
    .post(createUrl("/alumini/api/v1/setup/addBatchSchool"), values)
    .catch((error) => {
      return { error: "Something went wrong adding new schools" };
    });

  if (result?.data?.status == 1) {
    const data = await getschool();
    if (data?.success) {
      return {
        success: "Schools added successfully!",
        data: data?.data,
      };
    } else {
      return { error: "Something went wrong adding new schools" };
    }
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong adding new schools" };
  }
};

export const updateschool = async (
  values: z.infer<typeof SchoolSchema>,
  locale: any,
  id: string
) => {
  const existingToken = await generateSessionToken();

  // if (data.success) {
  const validatedFields = SchoolSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { school_name, address, country_id, phone_numbers } =
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

  let newcontact: any = [];
  await phone_numbers.map((phone: any) => {
    newcontact.push(phone.number);
  });

  const result: any = await axios
    .post(createUrl("/alumini/api/v1/setup/updateSchool"), {
      school_id: id,
      school_name,
      address,
      country_id,
      phone_numbers: newcontact,
    })
    .catch((error) => {
      return { error: "Something went wrong updating school" };
    });

  if (result?.data?.status == 1) {
    const data = await getschool();
    if (data?.success) {
      return {
        success: "School updated successfully!",
        data: data.data,
      };
    } else {
      return { error: "Something went wrong updating school" };
    }
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong updating school" };
  }
};

export const getschool = async () => {
  const existingToken = await generateSessionToken();

  axios.interceptors.request.use(
    (config) => {
      const { origin } = new URL(config.url!);
      const allowedOrigins = [apiUrl];
      if (allowedOrigins.includes(origin)) {
        config.headers.tokenID = `${existingToken?.token}`;
        config.headers["Content-Type"] = "application/json";
      }
      // console.log("Config data===============================, ", config);
      return config;
    },
    (error) => {
      return { error: "Admin error!!!!!" };
    }
  );

  const result: any = await axios
    .get(createUrl("/alumini/api/v1/setup/allSchools"))
    .catch((error) => {
      return { error: "Error getting data" };
    });

  if (result?.data?.status == 1) {
    return {
      success: "successful!",
      data: result?.data?.data,
    };
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return { error: "Error getting data" };
  }
};

export const getunschool = async () => {
  const existingToken = await generateSessionToken();

  axios.interceptors.request.use(
    (config) => {
      const { origin } = new URL(config.url!);
      const allowedOrigins = [apiUrl];
      if (allowedOrigins.includes(origin)) {
        config.headers.tokenID = `${existingToken?.token}`;
        config.headers["Content-Type"] = "application/json";
      }
      console.log("Config data===============================, ", config);
      return config;
    },
    (error) => {
      return { error: "Admin error!!!!!" };
    }
  );

  const result: any = await axios
    .get(createUrl("/alumini/api/v1/setup/allSchools"))
    .catch((error) => {
      return { error: "Error getting data" };
    });

  if (result?.data?.status == 1) {
    return {
      success: "successful!",
      data: result?.data?.data,
    };
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return { error: "Error getting data" };
  }
};
