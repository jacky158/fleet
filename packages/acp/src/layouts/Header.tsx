import { useApp } from "@ikx/core";
import { MuiIcon } from "@ikx/mui";
import { Link } from "@ikx/router";
import AppBar from "@mui/material/AppBar";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import styled from "@mui/material/styles/styled";
import { FormEvent, useCallback, useRef, useState } from "react";

const SearchField = styled(InputBase, {
  shouldForwardProp(propName) {
    return propName != "focused";
  },
})<{ focused?: boolean }>(({ theme, focused }) => ({
  borderRadius: 24,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  padding: theme.spacing(0, 2, 0, 0),
  width: focused ? "250px" : "100px",
  boxSizing: "border-box",
  background: focused ? "transparent" : theme.palette.action.hover,
  "& input": {
    padding: 0,
  },
  "& span": {
    cursor: "pointer",
  },
  transition: "width 150ms ease-in-out",
  outline: focused
    ? `2px solid ${theme.palette.primary.main}`
    : `0px solid ${theme.palette.primary.main}`,
}));

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
function SearchBox() {
  const [focused, setFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const q = inputRef.current?.value?.trim();

    if (!q) return;

    // continue search with q.
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input type="submit" className="srOnly" />
      <SearchField
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoCorrect="on"
        size="small"
        inputRef={inputRef}
        focused={Boolean(focused || inputRef.current?.value)}
        startAdornment={
          <IconButton
            onClick={() => setTimeout(() => inputRef.current?.focus(), 100)}
            children={<MuiIcon name="search" />}
          />
        }
      />
    </form>
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
            <SearchBox />
            <IconButton
              size="small"
              onClick={(evt) =>
                app.openPopover(evt, { component: "popover.Notifications" })
              }
            >
              <Badge
                badgeContent={"9k+"}
                variant="dot"
                color="warning"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MuiIcon name="notifications" style={{ width: 32 }} />
              </Badge>
            </IconButton>

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
