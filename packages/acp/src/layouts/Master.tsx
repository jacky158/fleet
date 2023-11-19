/**
 * @type: layout
 * @name: layout.master
 */

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Aside from "./Aside";

export default function Layout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const cx = desktop ? "var(--aside-width)" : "0px";
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

  return (
    <>
      <Header cx={cx} toggleDrawer={() => setDrawerOpened((prev) => !prev)} />
      <Aside
        variant={desktop ? "permanent" : "temporary"}
        open={drawerOpened}
        onClose={() => setDrawerOpened(false)}
      />
      {/* <Box sx={{ width: drawerWidth }}></Box> */}
      <Box sx={{ paddingLeft: cx, paddingTop: "50px" }}>
        <Box component="main" sx={{ height: 2000 }}>
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
}
