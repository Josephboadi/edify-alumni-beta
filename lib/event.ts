import EventListData from "@/data/events";

export const eventList = async (page: number) => {
  const ITEM_PER_PAGE = 4;
  try {
    let eventData = await EventListData;

    const pageCount = Math.ceil(eventData?.length / ITEM_PER_PAGE);
    const skip = (page - 1) * ITEM_PER_PAGE;
    eventData = eventData?.slice(skip, skip + ITEM_PER_PAGE);

    const eventsData = await eventData;

    return { pageCount, eventsData };
  } catch (error) {
    throw new Error("Failed to discussions data!");
  }
};

export const events = async () => {
  try {
    let eventListData = await EventListData;

    return { eventListData };
  } catch (error) {
    throw new Error("Failed to discussions data!");
  }
};

export const singleEvent = async (id: string) => {
  try {
    let eventData;
    let eventListData = await EventListData;
    eventListData.map((event) => {
      if (event.key.toString() === id.toString()) {
        eventData = event;
      }
    });

    return { eventData };
  } catch (error) {
    throw new Error("Failed to events data!");
  }
};
