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
import { MuiIcon } from "./MuiIcon";

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
  cx,
  toggleDrawer,
}: {
  cx: string;
  toggleDrawer: () => void;
}) {
  return (
    <AppBar
      component="header"
      variant="outlined"
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{ left: cx, zIndex: 1 }}
    >
      <Toolbar>
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
        <Box flex={1}></Box>
        <Stack direction="row" spacing={2}>
          <Badge
            badgeContent={"9k+"}
            color="warning"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <IconButton size="small">
              <MuiIcon name="notifications" style={{ width: 32 }} />
            </IconButton>
          </Badge>
          <IconButton size="small">
            <Avatar sx={{ width: 32, height: 32 }}>N</Avatar>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
