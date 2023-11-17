/**
 * @type: layout
 * @name: master
 */

import { Box } from "@mui/material";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Aside from "./Aside";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Aside />
      {/* <Box sx={{ width: drawerWidth }}></Box> */}
      <Box sx={{ paddingLeft: "var(--aside-width)", paddingTop: "50px" }}>
        <Box component="main" sx={{ height: 2000 }}>
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
}
