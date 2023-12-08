/**
 * @type: service
 * @name: menu
 */
import { App } from "@ikx/core";
import { MenuItemShape } from "@ikx/types";
import filterMenuItems from "./filterMenuItems";

class MenuBackend {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  public bootstrap() {}

  public load(
    loc: { resource?: string; loc: string },
    data: unknown
  ): MenuItemShape[] {
    const items = this.app.config<MenuItemShape[]>("menuItems", []);

    if (!items) return [];

    return filterMenuItems(items.flat(), loc, data).map((x) => x);
  }
}

export default MenuBackend;
