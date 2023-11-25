/**
 * @type: form.element
 * @name: Slider
 */
import { ElementProps, useFormikContext } from "@ikx/form-builder";
import get from "lodash/get";
import Slider, { SliderProps } from "@mui/material/Slider";

export default function SliderElement({
  name = "_submit",
  label = "submit",
  ...props
}: ElementProps<Omit<SliderProps, "children" | "type">>) {
  const formik = useFormikContext();

  const value = get(formik.values, name, 0);
  return (
    <Slider
      {...props}
      name={name}
      value={value}
      onChange={formik.handleChange}
      children={label}
    />
  );
}
