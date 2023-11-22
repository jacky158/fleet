/**
 * @type: route
 * @name: nested
 * @path: /nested
 */

import { Layout } from "@ikx/jsx";
import PageHeader from "../../ui/PageHeader";
import { Outline } from "@ikx/router";

export default function route() {
  return (
    <Layout name="layout.master">
      <PageHeader title="Nested Page" />
      <Outline base="sample_nest" />
    </Layout>
  );
}
