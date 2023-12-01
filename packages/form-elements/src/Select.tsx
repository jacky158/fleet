/**
 * @type: form.element
 * @name: Select
 */
import { ElementProps, useFormikContext } from "@ikx/form-builder";
import FormControl, { FormControlProps } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import get from "lodash/get";
import { ReactNode } from "react";

export type SelectElementProps = {
  options: { label: ReactNode; value: unknown }[];
} & ElementProps<Omit<SelectProps, "children" | "onChange">> &
  Omit<FormControlProps, "children">;

export default function CheckboxField({
  name,
  label,
  options,
  ...props
}: SelectElementProps) {
  const formik = useFormikContext();
  if (!name) return null;
  const meta = formik.getFieldMeta(name);
  const error =
    meta.error && (formik.submitCount || meta.touched || meta.initialTouched)
      ? meta.error
      : false;

  const value = get(formik.values, name, "");

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        {...props}
        labelId="demo-simple-select-label"
        id={name}
        value={value ?? ""}
        label={label}
        error={Boolean(error)}
        name={name}
        onChange={formik.handleChange}
      >
        {options.map(({ label, value }, index) => (
          <MenuItem value={value as string} key={index.toString()}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
