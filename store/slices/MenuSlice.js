export const createMenuSlice = (set, get) => ({
  toggle: false,
  toggleSide: true,
  toggleSide1: true,
  mouseHover: "",
  mouseCLick: "",
  subToggle: false,
  setToggle: () => {
    set({ toggle: !get().toggle });
  },
  setSubToggle: () => {
    set({ subToggle: !get().subToggle });
  },
  setToggleSide: () => {
    set({ toggleSide: !get().toggleSide });
  },
  setToggleSide1: () => {
    set({ toggleSide1: !get().toggleSide1 });
  },

  setMouseHover: (path) => {
    set({ mouseHover: path });
  },

  setMouseClick: (mouseCLick) => {
    set({ mouseCLick });
  },
});
