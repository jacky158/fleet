import { Data } from "./types";

declare module "@ikx/app" {
  export interface App {
    helmet(data: Data): void;
  }
}
