/**
 * @type: form.element
 * @name: Switch
 */
import { ElementProps, useFormikContext } from "@ikx/form-builder";
import get from "lodash/get";
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

export default function SwitchField({
  name,
  label,
  ...props
}: ElementProps<Omit<SwitchProps, "children" | "onChange" | "checked">> &
  Omit<FormControlLabelProps, "children" | "control">) {
  const formik = useFormikContext();
  if (!name) return null;

  const value = get(formik.values, name, "");

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            {...props}
            checked={Boolean(value)}
            onChange={(_, checked) => formik.setFieldValue(name, checked)}
          />
        }
        label={label}
      />
    </FormGroup>
  );
}
