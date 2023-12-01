/**
 * @type: form.element
 * @name: Date
 */
import { ElementProps, useFormikContext } from "@ikx/form-builder";
import get from "lodash/get";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs, { Dayjs } from "dayjs";

export default function Date({
  name,
  label,
}: ElementProps<{ name: string; placeholder: string }>) {
  const formik = useFormikContext();

  if (!name) return null;

  const value = get(formik.values, name, "");
  const meta = formik.getFieldMeta(name);
  const error =
    meta.error && (formik.submitCount || meta.touched || meta.initialTouched)
      ? meta.error
      : false;

  const handleChange = function (date: Dayjs | null) {
    formik.setFieldValue(name, date?.toISOString());
  };
  return (
    <DateField<Dayjs>
      label={label}
      slotProps={{
        textField: { error: Boolean(error), helperText: error },
      }}
      value={value ? dayjs(value) : null}
      onChange={handleChange}
    />
  );
}
