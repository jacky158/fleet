/**
 * @type: route
 * @name: customer
 * @path: /customer
 */
import { Layout } from "@ikx/jsx";
import { Typography } from "@mui/material";

export default function Customer() {
  return (
    <Layout name="layout.master">
      <Typography variant="h4">Customer</Typography>
    </Layout>
  );
}
