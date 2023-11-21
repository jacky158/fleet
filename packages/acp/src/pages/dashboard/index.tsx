/**
 * @type: route
 * @name: dashboard
 * @path: /dashboard, /
 */
import { Layout } from "@ikx/jsx";
import Typography from "@mui/material/Typography";
import PageHeader from "../../ui/PageHeader";

export default function Dashboard() {
  return (
    <Layout name="layout.master">
      <PageHeader title="Dashboard" subtitle="dashboard page" />
    </Layout>
  );
}
