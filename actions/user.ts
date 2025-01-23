"use server";
import { auth, signOut } from "@/auth";
import { getSessionByID } from "@/data/session-id";
import { createUrl } from "@/lib/http";
import axios from "axios";

const apiUrl = process.env.API_URL!;

export const getsingleuser = async (
  locale: any,
  id: string
) => {
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
    .get(createUrl(`/alumini/api/v1/User/all/${id}`))
    .catch((error) => {
      return { error: "Something went wrong getting user data" };
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
    return { error: "Something went wrong getting user data" };
  }
};

export const getusers = async () => {
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
    .get(createUrl("/alumini/api/v1/User/all"))
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
