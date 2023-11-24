/**
 * @type: route
 * @name: user
 * @path: /user/:tab?
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from "@ikx/acp/src/ui/PageHeader";
import { Layout } from "@ikx/jsx";
import { Outlet } from "@ikx/router";
import Box from "@mui/material/Box";

export default function Route(props: { tab: string }) {
  return (
    <Layout name="layout.master">
      <PageHeader
        title="Members"
        actions={[
          { label: "Browse", to: "/user" },
          { label: "Settings", to: "/user/settings" },
          { label: "Registration", to: "/user/registration" },
          { label: "Cancelled", to: "/user/cancelled/feedback" },
          { label: "Gender", to: "/user/gender" },
          { label: "Add new gender", to: "/user/gender/create" },
          { label: "Inactive", to: "/user/inactive" },
        ]}
      />
      <Box sx={{ p: 2 }}>
        <Outlet base="user" url={`/${props.tab ?? ""}`} />
      </Box>
    </Layout>
  );
}
