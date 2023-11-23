/**
 * @type: popover
 * @name: popover.LanguagePicker
 */
import { Menu, MenuItem, PopoverProps } from "@mui/material";

export default function LanguagePicker({
  ...props
}: Omit<PopoverProps, "children">) {
  return (
    <Menu
      {...props}
      disablePortal
      disableScrollLock
      className="popoverSizeSmall"
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      slotProps={{ paper: { sx: { minWidth: 200 } } }}
    >
      <MenuItem>English</MenuItem>
      <MenuItem>Vietnamese</MenuItem>
      <MenuItem>Spanish</MenuItem>
      <MenuItem>French</MenuItem>
      <MenuItem>Arabic</MenuItem>
    </Menu>
  );
}
