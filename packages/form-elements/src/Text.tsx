/**
 * @type: form.element
 * @name: Text
 */
import { ElementProps, useFormikContext } from "@ikx/form-builder";
import get from "lodash/get";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export default function Text({
  name,
  type,
  label,
  placeholder,
  ...props
}: ElementProps<Omit<TextFieldProps, "children">>) {
  const formik = useFormikContext();
  const value = get(formik.values, name, "");
  const meta = formik.getFieldMeta(name);
  const error =
    meta.error && (formik.submitCount || meta.touched || meta.initialTouched)
      ? meta.error
      : false;

  return (
    <TextField
      {...props}
      type={type}
      label={label}
      error={Boolean(error)}
      helperText={error}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  );
}
