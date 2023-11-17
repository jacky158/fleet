import { createContext } from "react";
import { FormBuilderSchema } from "./types";

export const FormSchemaContext = createContext<FormBuilderSchema>(
  {} as unknown as FormBuilderSchema
);

export default FormSchemaContext;
