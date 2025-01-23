"use server";
import { auth, signOut } from "@/auth";
import { getSessionByID } from "@/data/session-id";
import { createUrl } from "@/lib/http";
import { ContinentSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

const apiUrl = process.env.API_URL!;

type Continents = {
  continent_name: string;
};

export const addcontinent = async (
  values: z.infer<typeof ContinentSchema>,
  locale: any
) => {
  const authData = await auth();
  const existingToken = await getSessionByID(authData?.user?.id || "");
  // const data = await verifyAuth(authData?.user?.token || "");

  // if (data.success) {
  const validatedFields = ContinentSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { continent_name } = validatedFields.data;
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
    .post(createUrl("/alumini/api/v1/setup/addContinent"), { continent_name })
    .catch((error) => {
      return { error: "Something went wrong adding new continent" };
    });

  if (result?.data?.status == 1) {
    const data = await getcontinent();
    if (data?.success) {
      return {
        success: "Continent added successfully!",
        data: data?.data,
      };
    } else {
      return { error: "Something went wrong adding new continent" };
    }
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong adding new continent" };
  }
  // } else {
  //   await signOut();
  //   return { error: data.error };
  // }
};

export const addbatchcontinent = async (values: Continents[], locale: any) => {
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
    .post(createUrl("/alumini/api/v1/setup/addBatchContinent"), values)
    .catch((error) => {
      return { error: "Something went wrong adding new continents" };
    });

  if (result?.data?.status == 1) {
    const data = await getcontinent();
    if (data?.success) {
      return {
        success: "Continents added successfully!",
        data: data?.data,
      };
    } else {
      return { error: "Something went wrong adding new continents" };
    }
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong adding new continents" };
  }
};

export const updatecontinent = async (
  values: z.infer<typeof ContinentSchema>,
  locale: any,
  id: string
) => {
  const authData = await auth();
  const existingToken = await getSessionByID(authData?.user?.id || "");
  // const data = await verifyAuth(authData?.user?.token || "");

  // if (data.success) {
  const validatedFields = ContinentSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { continent_name } = validatedFields.data;
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
    .post(createUrl("/alumini/api/v1/setup/updateContinent"), {
      continent_id: id,
      continent_name,
    })
    .catch((error) => {
      return { error: "Something went wrong updating continent" };
    });

  if (result?.data?.status == 1) {
    const data = await getcontinent();
    if (data?.success) {
      return {
        success: "Continent updated successfully!",
        data: data.data,
      };
    } else {
      return { error: "Something went wrong updating continent" };
    }
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong updating continent" };
  }
  // } else {
  //   await signOut();
  //   return { error: data.error };
  // }
};

export const getcontinent = async () => {
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
    .get(createUrl("/alumini/api/v1/setup/allContinent"))
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
