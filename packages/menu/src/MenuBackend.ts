/**
 * @type: service
 * @name: menu
 */
import { App } from "@ikx/core";
import { MenuItemShape } from "@ikx/types";
import filterMenuItems from "./filterMenuItems";

class MenuBackend {
  app: App;

  constructor(app: App) {
    this.app = app;
  }

  public bootstrap() {}

  public load(
    loc: { resource?: string; loc: string },
    data: unknown
  ): MenuItemShape[] {
    const allItems = this.app.config<MenuItemShape[]>("menuItems", []);

    if (!allItems) return [];

    const items = filterMenuItems(allItems.flat(), loc, data);

    return items.map((x) => x);
  }
}

export default MenuBackend;
