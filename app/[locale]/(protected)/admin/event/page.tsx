import { getactiveevents } from "@/actions/event";
import { EventDataTable } from "../_components/Event";

const Event = async () => {
  let eventQueryData;
  try {
    eventQueryData = await getactiveevents();
    console.log(
      "Event Data===================================, ",
      eventQueryData
    );
  } catch (error) {
    eventQueryData = null;
  }
  return (
    <div className="">
      <EventDataTable eventQueryData={eventQueryData} />
    </div>
  );
};

export default Event;
