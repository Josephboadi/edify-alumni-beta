import ScholarshipListData from "@/data/scholarshiplist.json";

export const scholarShipList = async (q: string, page: number) => {
  const ITEM_PER_PAGE = 4;
  try {
    let scholarshipData = await ScholarshipListData;

    if (q.length > 3) {
      scholarshipData = scholarshipData.filter((scholarship) =>
        scholarship.title.toLowerCase().includes(q.toLowerCase())
      );
    }
    const pageCount = Math.ceil(scholarshipData?.length / ITEM_PER_PAGE);
    const skip = (page - 1) * ITEM_PER_PAGE;
    scholarshipData = scholarshipData?.slice(skip, skip + ITEM_PER_PAGE);

    const scholarshipsData = await scholarshipData;

    return { pageCount, scholarshipsData };
  } catch (error) {
    throw new Error("Failed to scholarships data!");
  }
};
