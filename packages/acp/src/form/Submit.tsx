/**
 * @type: form.element
 * @name: Submit
 */
import { ElementProps } from "@ikx/form-builder";
import Button, { ButtonProps } from "@mui/material/Button";

export default function SubmitButton({
  label = "submit",
  type = "submit",
  ...props
}: ElementProps<Omit<ButtonProps, "children">>) {
  return (
    <Button {...props} type={type}>
      {label}
    </Button>
  );
}
