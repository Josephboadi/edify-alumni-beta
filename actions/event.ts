"use server";
import { createUrl } from "@/lib/http";
import { deleteSessionToken, generateSessionToken } from "@/lib/tokens";
import { NewEventFormFinalSchema } from "@/schemas";
import axios from "axios";

const apiUrl = process.env.API_URL!;

export const addevent = async (
  values: NewEventFormFinalSchema,
  locale: any
) => {
  const existingToken = await generateSessionToken();
  // const validatedFields = NewEventFormFinalSchema.safeParse(values);
  // if (!validatedFields.success) {
  //   return { error: "Invalid fields!" };
  // }

  const {
    eventDate,
    eventStartTime,
    eventEndTime,
    eventTitle,
    eventDescription,
    eventLocation,
    eventCoverImage,
    eventHashTag,
  } = values;
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
    .post(createUrl("/alumini/api/v1/event/add"), {
      eventDate,
      eventStartTime,
      eventEndTime,
      eventTitle,
      eventDescription,
      eventLocation,
      eventCoverImage,
      eventHashTag,
    })
    .catch((error) => {
      return { error: "Something went wrong adding new event" };
    });

  if (result?.data?.status == 1) {
    const data = await getactiveevents();
    if (data?.success) {
      return {
        success: "Event added successfully!",
        data: data?.data,
      };
    } else {
      return { error: "Something went wrong adding new event" };
    }
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong adding new event" };
  }
};

export const updateevent = async (
  values: NewEventFormFinalSchema,
  locale: any,
  id: number,
  event_id: string,
  date_added: string,
  status: number,
  added_by_id: string
) => {
  const existingToken = await generateSessionToken();
  // const validatedFields = NewEventFormFinalSchema.safeParse(values);
  // if (!validatedFields.success) {
  //   return { error: "Invalid fields!" };
  // }

  const {
    eventDate,
    eventStartTime,
    eventEndTime,
    eventTitle,
    eventDescription,
    eventLocation,
    eventCoverImage,
    eventHashTag,
  } = values;
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
      id,
      event_id,
      date_added,
      eventDate,
      status,
      eventStartTime,
      eventEndTime,
      eventTitle,
      eventDescription,
      eventLocation,
      eventCoverImage,
      eventHashTag,
      added_by_id,
    })
    .catch((error) => {
      return { error: "Something went wrong updating event" };
    });

  if (result?.data?.status == 1) {
    const data = await getactiveevents();
    if (data?.success) {
      return {
        success: "Event updated successfully!",
        data: data.data,
      };
    } else {
      return { error: "Something went wrong updating event" };
    }
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong updating event" };
  }
};

export const bookevent = async (
  locale: any,
  user_id: string,
  event_id: string
) => {
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
    .post(createUrl("/alumini/api/v1/event/book"), {
      user_id,
      event_id,
    })
    .catch((error) => {
      return { error: "Something went wrong booking this event" };
    });

  if (result?.data?.status == 1) {
    return {
      success: "This event has been booked successfully!",
      data: result?.data?.data,
    };
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong booking this event" };
  }
};

export const getuseractiveevents = async () => {
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
      return { error: "Admin error!!!!!" };
    }
  );

  const result: any = await axios
    .get(createUrl("/alumini/api/v1/event/user-active-event"))
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

export const getactiveevents = async () => {
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
      console.log(error);
      return { error: "Admin error!!!!!" };
    }
  );

  const result: any = await axios
    .get(createUrl("/alumini/api/v1/event/active-event"))
    .catch((error) => {
      return { error: "Error getting data" };
    });

  // console.log(
  //   "Active Events API Response=====================================, ",
  //   result?.data
  // );
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
