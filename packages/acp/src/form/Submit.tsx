/**
 * @type: form.element
 * @name: Submit
 */
import { ElementProps, useFormikContext } from "@ikx/form-builder";
import Button, { ButtonProps } from "@mui/material/Button";

export default function SubmitButton({
  config: { component, name = "_submit", label = "submit", ...props },
}: ElementProps<Omit<ButtonProps, "children" | "type">>) {
  useFormikContext;
  if (component) {
    // skip
  }

  return <Button {...props} type="submit" name={name} children={label} />;
}
