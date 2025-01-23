"use server";
import { auth, signOut } from "@/auth";
import { getSessionByID } from "@/data/session-id";
import { createUrl } from "@/lib/http";
import { CountrySchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

const apiUrl = process.env.API_URL!;

type Countries = {
  country_name: string;
  country_code: string;
  subreion_id: string;
};

export const addcountry = async (
  values: z.infer<typeof CountrySchema>,
  locale: any
) => {
  const authData = await auth();
  const existingToken = await getSessionByID(authData?.user?.id || "");
  // const data = await verifyAuth(authData?.user?.token || "");

  // if (data.success) {
  const validatedFields = CountrySchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { country_name, country_code, subreion_id, is_edify_country } =
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
    .post(createUrl("/alumini/api/v1/setup/addCountry"), {
      country_name,
      country_code,
      subreion_id,
      is_edify_country: is_edify_country ? 1 : 0,
    })
    .catch((error) => {
      return { error: "Something went wrong adding new country" };
    });

  if (result?.data?.status == 1) {
    const data = await getcountry();
    if (data?.success) {
      return {
        success: "Country added successfully!",
        data: data?.data,
      };
    } else {
      return { error: "Something went wrong adding new Country" };
    }
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong adding new Country" };
  }
  // } else {
  //   await signOut();
  //   return { error: data.error };
  // }
};

export const addbatchcountry = async (values: Countries[], locale: any) => {
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
    .post(createUrl("/alumini/api/v1/setup/addBatchCountries"), values)
    .catch((error) => {
      return { error: "Something went wrong adding new countries" };
    });

  if (result?.data?.status == 1) {
    const data = await getcountry();
    if (data?.success) {
      return {
        success: "Countries added successfully!",
        data: data?.data,
      };
    } else {
      return { error: "Something went wrong adding new countries" };
    }
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong adding new countries" };
  }
};

export const updatecountry = async (
  values: z.infer<typeof CountrySchema>,
  locale: any,
  id: string
) => {
  const authData = await auth();
  const existingToken = await getSessionByID(authData?.user?.id || "");
  // const data = await verifyAuth(authData?.user?.token || "");

  // if (data.success) {
  const validatedFields = CountrySchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { country_name, country_code, subreion_id, is_edify_country } =
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
    .post(createUrl("/alumini/api/v1/setup/updateCountry"), {
      country_id: id,
      country_name,
      country_code,
      subreion_id,
      is_edify_country,
    })
    .catch((error) => {
      return { error: "Something went wrong updating country" };
    });

  if (result?.data?.status == 1) {
    const data = await getcountry();
    if (data?.success) {
      return {
        success: "Country updated successfully!",
        data: data.data,
      };
    } else {
      return { error: "Something went wrong updating country" };
    }
  } else if (result?.data?.status == 10) {
    await signOut();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong updating country" };
  }
  // } else {
  //   await signOut();
  //   return { error: data.error };
  // }
};

export const getcountry = async () => {
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
    .get(createUrl("/alumini/api/v1/setup/allCountries"))
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
