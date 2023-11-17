import { Data } from "./types";

declare module "@ikx/core" {
  export interface App {
    helmet(data: Data): void;
  }
}
