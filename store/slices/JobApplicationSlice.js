export const createJobSlice = (set, get) => ({
  open: false,
  jobInfoData: null,
  setJobInfoData: (jobInfoData) => {
    set({ jobInfoData: jobInfoData });
  },
  setOpen: () => set({ open: !get().open }),
});
