import NewsData from "@/data/briefnews.json";

export const news = async () => {
  const newsData = await NewsData;

  return newsData;
};
