/**
 * @type: route
 * @name: dashboard
 * @path: /dashboard, /
 */
import { Layout } from "@ikx/jsx";
import PageHeader from "@ikx/acp/src/ui/PageHeader";
import { MenuItemShape } from "@ikx/types";

const breadcrumbs: MenuItemShape[] = [
  { label: "Dashboard", to: "/" },
  { label: "Settings", to: "/settings" },
  { label: "Blogs", to: "/settings/blog" },
];

const actions: MenuItemShape[] = [
  { label: "Dashboard", to: "/" },
  { label: "Settings", to: "/settings" },
  { label: "Blogs", to: "/settings/blog" },
];

export default function Dashboard() {
  return (
    <Layout name="layout.master">
      <PageHeader
        title="Dashboard"
        breadcrumbs={breadcrumbs}
        actions={actions}
      />
    </Layout>
  );
}
