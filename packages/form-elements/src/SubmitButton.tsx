/**
 * @type: form.element
 * @name: Submit
 */
import { ElementProps } from "@ikx/form-builder";
import Button, { ButtonProps } from "@mui/material/Button";

export default function SubmitButton({
  label = "submit",
  type = "submit",
  variant = "contained",
  color = "primary",
  children,
  ...props
}: Omit<ElementProps<ButtonProps>, "name"> & { name?: string }) {
  return (
    <Button variant={variant} color={color} {...props} type={type}>
      {children ?? label}
    </Button>
  );
}
