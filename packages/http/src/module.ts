import { AxiosInstance } from "axios";
import MemStore from "./MemStore";
import HttpClient from "./HttpClient";
import { useFetch } from "./useFetch";
import { usePagination } from "./usePagination";

declare module "@ikx/core" {
  export interface App {
    http: HttpClient;
    cache: MemStore;
    axios: AxiosInstance;
    useFetch: typeof useFetch;
    usePagination: typeof usePagination;
  }
}
