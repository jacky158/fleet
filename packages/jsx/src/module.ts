import JsxBackend from "./JsxBackend";

declare module "@ikx/app" {
  export interface App {
    jsx: JsxBackend;
  }
}
