import JsxBackend from "./JsxBackend";

declare module "@ikx/core" {
  export interface App {
    jsx: JsxBackend;
  }
}
