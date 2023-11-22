import MemStore from "./MemStore";
import HttpClient from "./HttpClient";

declare module "@ikx/core" {
  export interface App {
    http: HttpClient;
    cache: MemStore;
  }
}
