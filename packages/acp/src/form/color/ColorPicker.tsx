/**
 * @type: form.element
 * @name: ColorPicker
 */
import styled from "@mui/material/styles/styled";
import FormGroup from "@mui/material/FormGroup";
import Popover from "@mui/material/Popover";
import { get } from "lodash";
import { useRef, useState } from "react";
import ColorPopover from "./ColorPickerPopover";
import { ElementProps, useFormikContext } from "@ikx/form-builder";

const Trigger = styled(
  "div",
  {}
)<{ color: string }>(({ color, theme }) => ({
  background: color,
  color: color,
  width: 200,
  height: 50,
  borderRadius: 4,
  boxShadow: theme.shadows[2],
  cursor: "pointer",
  ":hover": {
    boxShadow: theme.shadows[3],
  },
}));

export default function ColorPicker({ config: { name, label } }: ElementProps) {
  const formik = useFormikContext();
  const [open, setOpen] = useState<boolean>(false);
  const controlRef = useRef<HTMLDivElement>(null);

  const value = get(formik.values, name);

  const handleChange = (value: string) => {
    formik.setFieldValue(name, value);
  };

  return (
    <FormGroup>
      <div>{label}</div>
      <Trigger
        role="button"
        aria-label={label}
        color={value}
        onClick={() => setOpen(true)}
        ref={controlRef}
      >
        Click
      </Trigger>
      <Popover
        disablePortal
        open={open}
        anchorEl={controlRef.current}
        onClose={() => setOpen(false)}
      >
        <ColorPopover color={value} onChange={handleChange} />
      </Popover>
    </FormGroup>
  );
}
