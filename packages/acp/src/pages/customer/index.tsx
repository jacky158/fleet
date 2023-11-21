/**
 * @type: route
 * @name: customer
 * @path: /customer
 */
import { Layout } from "@ikx/jsx";
import PageHeader from "../../ui/PageHeader";

export default function index(props: unknown) {
  console.log({ props });
  console.log(index.loader);
  return (
    <Layout name="layout.master">
      <PageHeader title="Customer" />
    </Layout>
  );
}

index.loader = async function () {
  console.log("use loader to fill props");
};
