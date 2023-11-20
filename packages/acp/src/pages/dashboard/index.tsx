/**
 * @type: route
 * @name: dashboard
 * @path: /dashboard, /
 */
import { Layout } from "@ikx/jsx";
import Typography from "@mui/material/Typography";

export default function Dashboard() {
  return (
    <Layout name="layout.master">
      <Typography variant="h4">Dashboard</Typography>
    </Layout>
  );
}
