import { getdiscussionmessages } from "@/actions/discussion";
import { DiscussionMessages } from "../../_components/DiscussionMessages";

const DiscussionComments = async ({ params }: any) => {
  let discussionMessagesQueryData;
  try {
    discussionMessagesQueryData = await getdiscussionmessages(params.id);
  } catch (error) {
    discussionMessagesQueryData = null;
  }
  return (
    <div>
      <DiscussionMessages
        discussionMessagesQueryData={discussionMessagesQueryData}
      />
    </div>
  );
};

export default DiscussionComments;
