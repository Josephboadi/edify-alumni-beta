import MenuData from "@/data/menus.json";

export const menu = async () => {
  const menuData = await MenuData;

  return menuData;
};
