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

export default function SwitchField({
  config: { component, name, label, ...props },
}: ElementProps<Omit<SwitchProps, "children">> &
  Omit<FormControlLabelProps, "children" | "control">) {
  const formik = useFormikContext();
  if (component) {
    // skip
  }
  if (!name) return null;

  const value = get(formik.values, name, "");

  return (
    <FormControlLabel
      control={
        <Switch
          checked={Boolean(value)}
          {...props}
          onChange={(_, checked) => formik.setFieldValue(name, checked)}
        />
      }
      label={label}
    />
  );
}
