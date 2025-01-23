"use server";
import { db } from "@/lib/db";

export async function createMenu() {
  const menuTitle = "First menu";
  const path = "/";
  const icon = "MDmenu";
  const position = 1;
  const component = "Component 1";
  let parent_id;
  const foundMenu11 = await db.menu.findFirst({
    where: { menuTitle: menuTitle },
  });

  if (foundMenu11) {
    return;
  }

  const foundMenu = await db.menu.findFirst({
    where: { position: position },
  });
  if (foundMenu) {
    return;
  }
  const menu = await db.menu.create({
    data: {
      menuTitle: menuTitle,
      path: path,
      icon: icon,
      position: position,
      component: component,
      isParent: false,
      parent_id: parent_id ? parent_id : null,
    },
  });

  if (parent_id) {
    const parentMenu = await db.menu.findUnique({
      where: {
        id: parent_id,
      },
    });

    if (parentMenu) {
      // const depth = parentMenu.depth !== null ? parentMenu.depth + 1 : 1;
      await db.menuHierarchy.create({
        data: {
          parent_id: parentMenu.id,
          child_id: menu.id,
        },
      });
    }
  }

  return menu;
}

async function getAllMenus() {
  async function getMenusWithNestedSubmenus(
    parent_id: any,
    level: any,
    maxLevel: any
  ) {
    const menus = await db.menu.findMany({
      where: { parent_id: parent_id },
      orderBy: {
        position: "asc",
      },
    });
    if (level === maxLevel) {
      return menus;
    }
    const submenus: any = await Promise.all(
      menus.map((menu) =>
        getMenusWithNestedSubmenus(menu.id, level + 1, maxLevel)
      )
    );
    return menus.map((menu, index) => ({
      ...menu,
      submenus: submenus[index],
    }));
  }

  const allMenusWithSubmenus = await getMenusWithNestedSubmenus(null, 0, 10);

  return allMenusWithSubmenus;
}

async function main() {
  const allMenus = await getAllMenus();
  return allMenus;
}

export async function getAllNestedMenus() {
  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      //   await prisma.$disconnect();
      return;
    });
}
