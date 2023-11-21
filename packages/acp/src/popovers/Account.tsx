/**
 * @type: popover
 * @name: popover.AccountMenu
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MuiIcon } from "@ikx/mui";
import { Box, Divider, List, Popover, PopoverProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "@ikx/router";

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

const Icon = (props: any) => (
  <MuiIcon {...props} style={{ fontSize: "1.2em", minWidth: 32 }} />
);

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
        <Item href="/customer">
          <Icon name="person" />
          <Text>Profile</Text>
        </Item>
        <Item href="/analytics">
          <Icon name="settings" />
          <Text>Settings</Text>
        </Item>
        <Item href="/logout">
          <Icon name="logout" />
          <Text>Logout</Text>
        </Item>
      </List>
    </Popover>
  );
}
