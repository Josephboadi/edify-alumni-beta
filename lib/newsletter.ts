import NewsLetterData from "@/data/newsletters.json";

export const newsletters = async () => {
  const newslettersData = await NewsLetterData;

  return newslettersData;
};
