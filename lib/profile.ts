import ProfileData from "@/data/profile.json";

export const userProfile = async () => {
  const profileData = await ProfileData;

  return profileData;
};
