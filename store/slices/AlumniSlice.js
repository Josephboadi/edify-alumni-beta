export const createAlumniSlice = (set, get) => ({
  alumniInfoData: null,
  setAlumniInfoData: (alumniInfoData) => {
    set({ alumniInfoData: alumniInfoData });
  },
});
