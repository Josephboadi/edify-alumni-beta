import EventListData from "@/data/events";

export const eventsList = async () => {
  try {
    let eventData = await EventListData;
    return eventData;
  } catch (error) {
    throw new Error("Failed to events data!");
  }
};
