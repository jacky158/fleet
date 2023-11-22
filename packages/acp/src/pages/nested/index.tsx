/**
 * @type: route
 * @name: nested
 * @path: /nested/:tab?
 */

import { Layout } from "@ikx/jsx";
import PageHeader from "../../ui/PageHeader";
import { Outlet } from "@ikx/router";

export default function route() {
  return (
    <Layout name="layout.master">
      <PageHeader title="Nested Page" />
      <Outlet base="sample_nest" />
    </Layout>
  );
}
