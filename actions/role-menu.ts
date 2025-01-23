"use server";
import { db } from "@/lib/db";

export async function createRoleMenu() {
  const role = "USER";
  let id = 1;
  const foundMenu11 = await db.menu.findUnique({
    where: { id: id },
  });

  if (!foundMenu11) {
    return;
  }

  const checkExist = await db.roleMenu.findFirst({
    where: { menuTitle: foundMenu11.menuTitle, role: role },
  });

  if (foundMenu11.parent_id) {
    const foundtMenu = await db.menu.findUnique({
      where: { id: foundMenu11.parent_id },
    });

    const checkMenuExist = await db.roleMenu.findFirst({
      where: { menuTitle: foundtMenu?.menuTitle, role: role },
    });

    if (foundMenu11.parent_id && !checkMenuExist) {
      if (!checkExist) {
        try {
          const rolemenu = await db.roleMenu
            .create({
              data: {
                menuTitle: foundtMenu?.menuTitle!,
                path: foundtMenu?.path,
                icon: foundtMenu?.icon!,
                position: foundtMenu?.position!,
                component: foundtMenu?.component,
                role: role,
                isParent: foundtMenu?.isParent!,
                parent_id: foundtMenu?.parent_id && foundtMenu?.parent_id,
              },
            })
            .catch((err) => {
              return;
            });

          if (rolemenu) {
            const rolemenu1 = await db.roleMenu.create({
              data: {
                menuTitle: foundMenu11?.menuTitle!,
                path: foundMenu11?.path,
                icon: foundMenu11?.icon!,
                position: foundMenu11?.position!,
                component: foundMenu11?.component,
                role: role,
                isParent: foundMenu11?.isParent!,
                parent_id: rolemenu?.id && rolemenu?.id,
              },
            });

            await db.roleMenuHierarchy.create({
              data: {
                parent_id: rolemenu?.id!,
                child_id: rolemenu1?.id,
              },
            });
            return rolemenu;
          } else {
            console.log("Select Parent Menu First");
          }
        } catch (error) {
          return;
        }
      } else {
        return "Sorry....., This Menu has already been assigned to this role.";
      }
    } else if (foundMenu11.parent_id && checkMenuExist) {
      if (!checkExist) {
        const rolemenu1 = await db.roleMenu.create({
          data: {
            menuTitle: foundMenu11?.menuTitle!,
            path: foundMenu11?.path,
            icon: foundMenu11?.icon!,
            position: foundMenu11?.position!,
            component: foundMenu11?.component,
            role: role,
            isParent: foundMenu11?.isParent!,
            parent_id: checkMenuExist?.id && checkMenuExist?.id,
          },
        });

        await db.roleMenuHierarchy.create({
          data: {
            parent_id: checkMenuExist.id,
            child_id: rolemenu1.id,
          },
        });
        return rolemenu1;
      } else {
        return "Sorry....., This Menu has already been assigned to this role.";
      }
    } else {
      return;
    }
  } else if (!foundMenu11.parent_id && checkExist?.role !== role) {
    const rolemenu1 = await db.roleMenu.create({
      data: {
        menuTitle: foundMenu11?.menuTitle!,
        path: foundMenu11?.path,
        icon: foundMenu11?.icon!,
        position: foundMenu11?.position!,
        component: foundMenu11?.component,
        role: role,
        isParent: foundMenu11?.isParent!,
        parent_id: foundMenu11?.parent_id && foundMenu11?.parent_id,
      },
    });

    return rolemenu1;
  } else {
    return;
  }
}

async function getAllRoleMenus() {
  const role = "USER";
  async function getMenusWithNestedSubmenus(
    parent_id: any,
    level: any,
    maxLevel: any
  ) {
    const menus = await db.roleMenu.findMany({
      where: { parent_id: parent_id, role: role },
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
  const allMenus = await getAllRoleMenus();
  return allMenus;
}

export async function getAllNestedRoleMenus() {
  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      //   await prisma.$disconnect();
      return;
    });
}
