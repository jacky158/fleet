/**
 * @type: form.element
 * @name: Rating
 */
import { ElementProps, useFormikContext } from "@ikx/form-builder";
import get from "lodash/get";
import Rating, { RatingProps } from "@mui/material/Rating";

export default function RatingField({
  name,
  ...props
}: ElementProps<Omit<RatingProps, "children">>) {
  const formik = useFormikContext();

  if (!name) return null;

  const value = get(formik.values, name, 0);
  return (
    <Rating
      {...props}
      name={name}
      value={value}
      onChange={(_, newValue) => {
        formik.setFieldValue(name, newValue);
      }}
    />
  );
}
