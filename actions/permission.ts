"use server";
import { db } from "@/lib/db";

export async function createMenu() {
  const permission = 11;
  const controller = 1;
  const controllerName = "User";
  const action = "viewUsers";
  const actionName = "view all";
  const position = 1;
  const foundPermission = await db.permission.findFirst({
    where: { permission: permission, controller: controller },
  });

  if (foundPermission) {
    return;
  }
  const perm = await db.permission.create({
    data: {
      permission: permission,
      controller: controller,
      controllerName: controllerName,
      action: action,
      actionName: actionName,
      position: position,
    },
  });

  return perm;
}
