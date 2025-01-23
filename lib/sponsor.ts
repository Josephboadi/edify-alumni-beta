import SponsorData from "@/data/sponsors.json";

export const sponsor = async () => {
  const sponsorData = await SponsorData;

  return sponsorData;
};
