/**
 * @type: route
 * @name: nested
 * @path: /nested/:tab?
 */

import { Layout } from "@ikx/jsx";
import PageHeader from "../../ui/PageHeader";
import { Outlet } from "@ikx/route";

interface Props {
  tab: string;
}

export default function route({ tab }: Props) {
  return (
    <Layout name="layout.master">
      <PageHeader
        title="Nested Page"
        labs={[
          { label: "Child", to: "/nested/child" },
          { label: "Child", to: "/nested/child2" },
        ]}
      />
      <Outlet base="sample_nest" url={`/${tab}`} />
    </Layout>
  );
}
