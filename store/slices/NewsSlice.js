export const createNewsSlice = (set, get) => ({
  newsInfoData: null,
  setNewsInfoData: (newsInfoData) => {
    set({ newsInfoData: newsInfoData });
  },
});
