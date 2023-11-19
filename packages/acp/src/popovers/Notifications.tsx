/**
 * @type: popover
 * @name: popover.notifications
 */
import { useApp } from "@ikx/core";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Popover,
  PopoverProps,
  Stack,
  Typography,
} from "@mui/material";
import { MuiIcon, Link } from "@ikx/mui";

export default function Notifications({
  ...props
}: Omit<PopoverProps, "children">) {
  const app = useApp();
  return (
    <Popover
      {...props}
      disablePortal
      disableScrollLock
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      slotProps={{ paper: { sx: { minWidth: 320 } } }}
    >
      <Stack
        direction="row"
        sx={{ px: 2, py: 2, justifyContent: "space-between" }}
      >
        <Typography variant="h6">{app.t("notifications")}</Typography>
        <IconButton size="small">
          <MuiIcon name="mail" />
        </IconButton>
      </Stack>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar sizes="small">A</Avatar>
          </ListItemAvatar>
          <Box>
            <Typography variant="body2" component="span">
              <Link to="/account">[This is long headline]</Link>
            </Typography>
            <Typography variant="body2">[This is long headline]</Typography>
            <small>{app.d(Date.now(), "LL")}</small>
          </Box>
          <ListItemSecondaryAction>
            <IconButton size="small">
              <MuiIcon name="close" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Popover>
  );
}
