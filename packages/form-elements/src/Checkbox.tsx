/**
 * @type: form.element
 * @name: Checkbox
 */
import { ElementProps, useFormikContext } from "@ikx/form-builder";
import get from "lodash/get";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import FormGroup, { FormGroupProps } from "@mui/material/FormGroup";

export default function CheckboxField({
  name,
  label,
  ...props
}: ElementProps<Omit<CheckboxProps, "children">> &
  Omit<FormControlLabelProps, "children" | "control"> &
  Omit<FormGroupProps, "children">) {
  const formik = useFormikContext();

  if (!name) return null;

  const value = get(formik.values, name, "");

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={Boolean(value)}
            {...props}
            onChange={(_, checked) => formik.setFieldValue(name, checked)}
          />
        }
        label={label}
      />
    </FormGroup>
  );
}
