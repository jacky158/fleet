/**
 * @type: form.element
 * @name: Submit
 */
import { ElementProps } from "@ikx/form-builder";
import Button, { ButtonProps } from "@mui/material/Button";

export default function SubmitButton({
  name = "_submit",
  label = "submit",
  ...props
}: ElementProps<Omit<ButtonProps, "children" | "type">>) {
  return <Button {...props} type="submit" name={name} children={label} />;
}
