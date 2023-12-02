/**
 * @type: route
 * @name: user
 * @path: /user/:tab?
 * @bundle: admincp
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from "@ikx/jsx";
import { Outlet } from "@ikx/route";
import Box from "@mui/material/Box";

export default function Route(props: { tab: string }) {
  return (
    <Layout name="layout.master">
      <Box sx={{ p: 2 }}>
        <Outlet base="user" url={`/${props.tab ?? ""}`} />
      </Box>
    </Layout>
  );
}
