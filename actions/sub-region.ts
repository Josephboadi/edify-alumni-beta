"use server";
import { createUrl } from "@/lib/http";
import { deleteSessionToken, generateSessionToken } from "@/lib/tokens";
import { SubRegionSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

const apiUrl = process.env.API_URL!;

type SubRegions = {
  subregion_name: string;
  continent_id: string;
};

export const addsubregion = async (
  values: z.infer<typeof SubRegionSchema>,
  locale: any
) => {
  const existingToken = await generateSessionToken();

  // if (data.success) {
  const validatedFields = SubRegionSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { subregion_name, continent_id } = validatedFields.data;
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
    .post(createUrl("/alumini/api/v1/setup/addSubregion"), {
      subregion_name,
      continent_id,
    })
    .catch((error) => {
      return { error: "Something went wrong adding new sub-region" };
    });

  if (result?.data?.status == 1) {
    const data = await getsubregion();
    if (data?.success) {
      return {
        success: "Sub-region added successfully!",
        data: data?.data,
      };
    } else {
      return { error: "Something went wrong adding new Sub-region" };
    }
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong adding new Sub-region" };
  }
};

export const addbatchsubregion = async (values: SubRegions[], locale: any) => {
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
    .post(createUrl("/alumini/api/v1/setup/addBatchSubregion"), values)
    .catch((error) => {
      return { error: "Something went wrong adding new sub-continents" };
    });

  if (result?.data?.status == 1) {
    const data = await getsubregion();
    if (data?.success) {
      return {
        success: "Sub-continents added successfully!",
        data: data?.data,
      };
    } else {
      return { error: "Something went wrong adding new sub-continents" };
    }
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong adding new sub-continents" };
  }
};

export const updatesubregion = async (
  values: z.infer<typeof SubRegionSchema>,
  locale: any,
  id: string
) => {
  const existingToken = await generateSessionToken();

  // if (data.success) {
  const validatedFields = SubRegionSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { subregion_name, continent_id } = validatedFields.data;
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
    .post(createUrl("/alumini/api/v1/setup/updateSubregion"), {
      subreion_id: id,
      subregion_name,
      continent_id,
    })
    .catch((error) => {
      return { error: "Something went wrong updating continent" };
    });

  if (result?.data?.status == 1) {
    const data = await getsubregion();
    if (data?.success) {
      return {
        success: "Continent updated successfully!",
        data: data.data,
      };
    } else {
      return { error: "Something went wrong updating continent" };
    }
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong updating continent" };
  }
};

export const getsubregion = async () => {
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
    .get(createUrl("/alumini/api/v1/setup/allSubregion"))
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
