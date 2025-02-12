"use server";
import { createUrl } from "@/lib/http";
import { deleteSessionToken, generateSessionToken } from "@/lib/tokens";
import { AddDiscussionCommentSchema, NewDiscussionFormSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

const apiUrl = process.env.API_URL!;

export const adddiscussion = async (
  values: z.infer<typeof NewDiscussionFormSchema>,
  locale: any
) => {
  const existingToken = await generateSessionToken();
  const validatedFields = NewDiscussionFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { topic, cover_image } = validatedFields.data;
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
    .post(createUrl("/alumini/api/v1/discussion/add"), {
      topic,
      cover_image,
    })
    .catch((error) => {
      return { error: "Something went wrong adding new discussion topic" };
    });

  if (result?.data?.status == 1) {
    const data = await getdiscussiontopics();
    if (data?.success) {
      return {
        success: "Discussion topic added successfully!",
        data: data?.data,
      };
    } else {
      return { error: "Something went wrong adding new discussion topic" };
    }
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong adding new discussion topic" };
  }
};

export const updatediscussiontopic = async (
  values: z.infer<typeof NewDiscussionFormSchema>,
  locale: any,
  id: number,
  discussion_id: string,
  date_added: string,
  status: number,
  added_by_id: string
) => {
  const existingToken = await generateSessionToken();
  const validatedFields = NewDiscussionFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { topic, cover_image } = validatedFields.data;
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
    .post(createUrl("/alumini/api/v1/discussion/update-discussion"), {
      id,
      discussion_id,
      date_added,
      status,
      topic,
      cover_image,
      added_by_id,
    })
    .catch((error) => {
      return { error: "Something went wrong updating discussion topic" };
    });

  if (result?.data?.status == 1) {
    const data = await getdiscussiontopics();
    if (data?.success) {
      return {
        success: "Discussion topic updated successfully!",
        data: data.data,
      };
    } else {
      return { error: "Something went wrong updating discussion topic" };
    }
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return { error: "Something went wrong updating discussion topic" };
  }
};

export const adddiscussiontopicomment = async (
  values: z.infer<typeof AddDiscussionCommentSchema>,
  locale: any,
  discussion_id: string
) => {
  const existingToken = await generateSessionToken();
  const validatedFields = AddDiscussionCommentSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { message } = validatedFields.data;

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
    .post(createUrl("/alumini/api/v1/discussion/add-message"), {
      discussion_id,
      message,
    })
    .catch((error) => {
      return {
        error: "Something went wrong adding a comment to this discussion",
      };
    });

  if (result?.data?.status == 1) {
    const data = await getdiscussionmessages(discussion_id);
    if (data?.success) {
      return {
        success: "Comment added successfully!",
        data: data?.data,
      };
    } else {
      return {
        error: "Something went wrong adding a comment to this discussion",
      };
    }
  } else if (result?.data?.status == 10) {
    await deleteSessionToken();
    return { error: result?.data?.message };
  } else {
    return {
      error: "Something went wrong adding a comment to this discussion",
    };
  }
};

export const getdiscussionmessages = async (discussion_id: string) => {
  const existingToken = await generateSessionToken();

  axios.interceptors.request.use(
    (config) => {
      const { origin } = new URL(config.url!);
      const allowedOrigins = [apiUrl];
      if (allowedOrigins.includes(origin)) {
        config.headers.tokenID = `${existingToken?.token}`;
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    },
    (error) => {
      return { error: "Admin error!!!!!" };
    }
  );

  const result: any = await axios
    .get(
      createUrl(
        `/alumini/api/v1/discussion/discussion-details/${discussion_id}`
      )
    )
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

export const getdiscussiontopics = async () => {
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
      console.log(error);
      return { error: "Admin error!!!!!" };
    }
  );

  const result: any = await axios
    .get(createUrl("/alumini/api/v1/discussion/active-discussion"))
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
