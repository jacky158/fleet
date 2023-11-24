/**
 * @type: form.element
 * @name: TextArea
 */
import { ElementProps, useFormikContext } from "@ikx/form-builder";
import get from "lodash/get";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export default function TextArea({
  name,
  type,
  label,
  placeholder,
  ...props
}: ElementProps<Omit<TextFieldProps, "children">>) {
  const formik = useFormikContext();

  const value = get(formik.values, name, "");
  return (
    <TextField
      {...props}
      type={type}
      label={label}
      name={name}
      multiline
      value={value}
      placeholder={placeholder}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  );
}
