import { useApp } from "@ikx/core";
import { MuiIcon } from "@ikx/mui";
import { Link } from "@ikx/router";
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
  useTheme,
} from "@mui/material";
import { useCallback } from "react";

export function AppBarBranch() {
  return (
    <>
      <Box sx={{ pr: 2, cursor: "pointer" }}>
        <Link to="/">
          <img src="/logo.png" height="32" />
        </Link>
      </Box>
      <Box sx={{ display: "none" }}>
        <Typography
          variant="h6"
          component="a"
          color="primary"
          sx={{ cursor: "pointer" }}
        >
          phpFox
        </Typography>
      </Box>
    </>
  );
}

function DarkModeButton() {
  const app = useApp();
  const theme = useTheme();
  const handleDarkMode = useCallback(() => {
    const mode = theme?.palette.mode == "dark" ? "light" : "dark";
    app.cookies.set("theme.mode", mode);
    app.setConfig("theme.mode", mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <IconButton size="small" onClick={handleDarkMode}>
      <MuiIcon
        name={theme?.palette.mode == "dark" ? "light_mode" : "dark_mode"}
        style={{ width: 32 }}
      />
    </IconButton>
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
          zIndex: 2,
          transitionProperty: "padding-left",
          transitionDuration: "250ms",
        }}
      >
        <Toolbar disableGutters sx={{ pl: 2, pr: 2 }}>
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
            <Button
              size="small"
              variant="text"
              color="inherit"
              onClick={(evt) =>
                app.openPopover(evt, { component: "popover.LanguagePicker" })
              }
            >
              English
            </Button>
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
            <DarkModeButton />
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
