/**
 * @type: form.element
 * @name: Password
 */
import { ElementProps, useFormikContext } from "@ikx/form-builder";
import get from "lodash/get";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import { MuiIcon } from "@ikx/mui";
import { useState } from "react";

export default function Password({
  name,
  ...props
}: ElementProps<Omit<TextFieldProps, "children" | "type" | "value">>) {
  const formik = useFormikContext();
  const [type, setType] = useState<"text" | "password">("password");
  const value = get(formik.values, name, "");

  return (
    <TextField
      {...props}
      type={type}
      name={name}
      value={value}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      InputProps={{
        endAdornment: (
          <IconButton
            size="small"
            onClick={() =>
              setType((prev) => (prev == "password" ? "text" : "password"))
            }
            children={<MuiIcon name="disabled_visible" />}
          />
        ),
      }}
    />
  );
}
