import { useScrollEnd } from "./useScrollEnd";
import "@ikx/core";
declare module "@ikx/core" {
  export interface App {
    useScrollEnd: typeof useScrollEnd;
  }
}
