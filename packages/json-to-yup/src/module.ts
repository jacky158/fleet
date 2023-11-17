import { AnySchema } from "yup";

declare module "@ikx/app" {
  export interface App {
    yup(obj: object): AnySchema;
  }
}
