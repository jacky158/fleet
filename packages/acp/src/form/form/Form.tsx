/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @type: form.element
 * @name: Form
 */

import { ElementProps, Element, useFormikContext } from "@ikx/form-builder";
import map from "lodash/map";

export default function FormContainer({
  elements,
  role,
  title,
  testid,
}: ElementProps<{
  role: "form";
  title?: string;
}>) {
  const formik = useFormikContext();

  if (!elements) return null;

  return (
    <form
      onSubmit={formik.handleSubmit}
      role={role ?? "form"}
      aria-label={title}
      id={testid ?? "form"}
    >
      {map(elements, (config, key) => (
        <Element key={key.toString()} {...(config as any)} />
      ))}
    </form>
  );
}
