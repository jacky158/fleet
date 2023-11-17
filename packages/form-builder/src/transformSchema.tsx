import { merge } from "lodash";
import { FormBuilderSchema } from "./types";

export default function transformSchema(
  data: Record<string, unknown>,
  values: unknown,
  dialog?: boolean
): FormBuilderSchema {
  Object.freeze(data);
  const schema: FormBuilderSchema = { ...data } as FormBuilderSchema;

  const { header, footer, ...elements } = schema.elements || {};

  schema.dialog = dialog;
  schema.elements = {
    header: header ?? {
      component: "FormHeader",
      elements: {},
      action: data.action,
    },
    content: {
      component: "FormContent",
      elements,
    },
    footer: footer ?? {
      component: "FormFooter",
      elements: {},
    },
  };

  if (data.value) {
    // this method may not work with array merge
    merge(values, schema.value, { ...(values as object) });
  }

  return schema;
}
