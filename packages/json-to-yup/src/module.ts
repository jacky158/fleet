import { AnySchema } from "yup";

declare module "@ikx/core" {
  export interface App {
    yup(obj: object): AnySchema;
  }
}
