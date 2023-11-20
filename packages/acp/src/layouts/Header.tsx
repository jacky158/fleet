import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useApp } from "@ikx/core";
import { MuiIcon } from "@ikx/mui";

export function AppBarBranch() {
  return (
    <>
      <Box sx={{ pr: 2, cursor: "pointer" }}>
        <a href="/">
          <img src="/logo.png" height="32" />
        </a>
      </Box>
      <Box sx={{ display: "none" }}>
        <Typography
          variant="h6"
          component="a"
          href="/"
          color="primary"
          sx={{ cursor: "pointer" }}
        >
          phpFox
        </Typography>
      </Box>
    </>
  );
}

export default function Header({
  dx,
  toggleDrawer,
}: {
  dx: string;
  toggleDrawer: () => void;
}) {
  const app = useApp();
  return (
    <>
      <AppBar
        component="header"
        variant="outlined"
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          paddingLeft: dx,
          zIndex: 1,
          transitionProperty: "padding-left",
          transitionDuration: "250ms",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 0 }}></Box>
          <Button
            onClick={toggleDrawer}
            sx={{
              width: 40,
              minWidth: 40,
              fontSize: "32px",
              lineHeight: "32px",
              padding: "0 0 0 0",
            }}
          >
            <MuiIcon name="dehaze" />
          </Button>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Stack direction="row" spacing={1}>
            <Badge
              badgeContent={"9k+"}
              color="warning"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <IconButton
                size="small"
                onClick={(evt) =>
                  app.openPopover(evt, { component: "popover.Notifications" })
                }
              >
                <MuiIcon name="notifications" style={{ width: 32 }} />
              </IconButton>
            </Badge>
            <IconButton
              size="small"
              onClick={(evt) =>
                app.openPopover(evt, { component: "popover.AccountMenu" })
              }
            >
              <Avatar sx={{ width: 32, height: 32 }}>N</Avatar>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: 64 }}></Box>
    </>
  );
}
