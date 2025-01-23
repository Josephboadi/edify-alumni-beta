export const createScholarshipSlice = (set, get) => ({
  scholarshipInfoData: null,
  setScholarshipInfoData: (scholarshipInfoData) => {
    set({ scholarshipInfoData: scholarshipInfoData });
  },
});
