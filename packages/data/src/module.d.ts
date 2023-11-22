import useFetch from "./useFetch";
import usePagination from "./usePagination";

declare module "@ikx/core" {
  export interface App {
    useFetch: typeof useFetch;
    usePagination: typeof usePagination;
  }
}
