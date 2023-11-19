/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @type: popover
 * @name: popover.AccountMenu
 */
import { Link as RouterLink, MuiIcon } from "@ikx/mui";
import {
  Box,
  Divider,
  List,
  Popover,
  PopoverProps,
  ListItemButton as Item,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Link = styled(RouterLink)(({ theme }) => ({
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
        <Item component={Link} to="/customer">
          <Icon name="person" />
          <Text>Profile</Text>
        </Item>
        <Item component={Link} to="/analytics" underline="none" color="inherit">
          <Icon name="settings" />
          <Text>Settings</Text>
        </Item>
        <Item component={Link} to="/dashboard" underline="none" color="inherit">
          <Icon name="logout" />
          <Text>Logout</Text>
        </Item>
      </List>
    </Popover>
  );
}
