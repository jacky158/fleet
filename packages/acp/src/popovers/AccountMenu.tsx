/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @type: popover
 * @name: AccountMenu
 */

import { Link } from "@ikx/router";
import { Box, Divider, List, Popover, PopoverProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Link)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "row",
  lineHeight: 1.5,
  alignItems: "center",
  padding: "8px 16px",
  color: "inherit",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Text = styled("span")({
  flexGrow: 1,
});

export default function AccountMenu({
  ...props
}: Omit<PopoverProps, "children">) {
  return (
    <Popover
      {...props}
      disablePortal
      disableScrollLock
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      slotProps={{ paper: { sx: { minWidth: 240 } } }}
    >
      <Box sx={{ px: 2, pt: 3, pb: 2 }}>
        <strong>Anika Visser</strong>
        <br />
        <small>mymail@mui.com</small>
      </Box>
      <Divider variant="middle" />
      <List component="div">
        <Item to="/customer">
          <Text>Profile</Text>
        </Item>
        <Item to="/analytics">
          <Text>Settings</Text>
        </Item>
        <Item to="/logout">
          <Text>Logout</Text>
        </Item>
      </List>
    </Popover>
  );
}
