import { getdiscussiontopics } from "@/actions/discussion";
import { DiscussionDataTable } from "../_components/Discussion";

const Discussion = async () => {
  let discussionQueryData;
  try {
    discussionQueryData = await getdiscussiontopics();
  } catch (error) {
    discussionQueryData = null;
  }
  return (
    <div className="">
      <DiscussionDataTable discussionQueryData={discussionQueryData} />
    </div>
  );
};

export default Discussion;
