/**
 * @type: popover
 * @name: popover.Notifications
 */
import { useApp } from "@ikx/core";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Popover,
  PopoverProps,
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
      <Box
        sx={{
          px: 2,
          pt: 2,
          pb: 1,
          justifyContent: "space-between",
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" component="span">
          {app.t("notifications")}
        </Typography>
        <IconButton size="small">
          <MuiIcon name="mail" />
        </IconButton>
      </Box>
      <Divider variant="middle" />
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar sizes="small">A</Avatar>
          </ListItemAvatar>
          <Box>
            <Typography variant="body2" component="span">
              <Link href="/account">[This is long headline]</Link>
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
