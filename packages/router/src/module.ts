import Router from "./Router";

declare module "@ikx/core" {
  export interface App {
    router: Router;
  }
}
