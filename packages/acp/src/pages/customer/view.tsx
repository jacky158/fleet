/**
 * @type: route
 * @name: customer.view
 * @path: /customer/:customer_id(\d+)
 */

import { Layout } from "@ikx/jsx";
import PageHeader from "../../ui/PageHeader";

export default function route(props: { customer_id: string }) {
  console.log(props);

  return (
    <Layout name="layout.master">
      <PageHeader title="Customer" />
    </Layout>
  );
}
