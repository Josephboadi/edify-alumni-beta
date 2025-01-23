import DiscussionListData from "@/data/discussionlist.json";

export const discussionList = async (q: string, page: number) => {
  // const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;
  try {
    let discussionData = await DiscussionListData;

    if (q.length > 3) {
      discussionData = discussionData.filter((discussion) => {
        return (
          discussion.topic.toLowerCase().includes(q.toLowerCase()) ||
          discussion.hashTags.some((tag:any) =>
            tag.hash.toLowerCase().includes(q.toLowerCase())
          )
        );
      });
    }
    const pageCount = Math.ceil(discussionData?.length / ITEM_PER_PAGE);
    const skip = (page - 1) * ITEM_PER_PAGE;
    discussionData = discussionData?.slice(skip, skip + ITEM_PER_PAGE);

    const discussionsData = await discussionData;

    return { pageCount, discussionsData };
  } catch (error) {
    throw new Error("Failed to discussions data!");
  }
};

export const discussions = async () => {
  try {
    let discussionListData = await DiscussionListData;

    return { discussionListData };
  } catch (error) {
    throw new Error("Failed to discussions data!");
  }
};

export const singleTopic = async (id: string) => {
  try {
    let discussionData;
    let discussionListData = await DiscussionListData;
    discussionListData.map((discussion) => {
      if (discussion.key.toString() === id.toString()) {
        discussionData = discussion;
      }
    });

    return { discussionData };
  } catch (error) {
    throw new Error("Failed to discussions data!");
  }
};
