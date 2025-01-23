import HeroData from "@/data/heros.json";

export const heroes = async () => {
  const herosData = await HeroData;

  return herosData;
};
