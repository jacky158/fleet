/**
 * @type: form.element
 * @name: DatePicker
 */
import { ElementProps, useFormikContext } from "@ikx/form-builder";
import get from "lodash/get";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useCallback } from "react";
import type { TextFieldProps } from "@mui/material";

export default function DatePickerElement({
  name,
  label,
  size,
  required,
  variant,
}: ElementProps<
  { name: string; placeholder: string } & Omit<
    TextFieldProps,
    "children" | "placeholder" | "type"
  >
>) {
  const formik = useFormikContext();
  const value = get(formik.values, name, "");
  const meta = formik.getFieldMeta(name);
  const error =
    meta.error && (formik.submitCount || meta.touched || meta.initialTouched)
      ? meta.error
      : false;

  const handleChange: DatePickerProps<Dayjs>["onChange"] = useCallback(
    (date: Dayjs | null) => {
      formik.setFieldValue(name, date?.toISOString());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <DatePicker<Dayjs>
      label={label}
      value={value ? dayjs(value) : null}
      onChange={handleChange}
      slotProps={{
        textField: {
          label,
          size,
          required,
          variant,
          error: Boolean(error),
          helperText: error,
        },
      }}
    />
  );
}
