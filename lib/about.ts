import AboutData from "@/data/about.json";

export const about = async () => {
  const aboutData = await AboutData;

  return aboutData;
};
