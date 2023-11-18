import { AppBar, Box, Toolbar, Typography } from "@mui/material";

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

export default function Header() {
  return (
    <AppBar
      component="header"
      variant="outlined"
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{ left: "var(--aside-width)", zIndex: 1 }}
    >
      <Toolbar variant="dense">
        <AppBarBranch />
      </Toolbar>
    </AppBar>
  );
}
