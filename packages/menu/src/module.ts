import MenuBackend from "./MenuBackend";

declare module "@ikx/core" {
  export interface App {
    menu: MenuBackend;
  }
}
