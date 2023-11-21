/**
 * @type: route
 * @name: customer
 * @path: /customer/view/:id
 */
import { Layout } from "@ikx/jsx";
import { Typography } from "@mui/material";

export default function page(props: unknown) {
  page.loader().then((data) => console.log(props, data));
  return (
    <Layout name="layout.master">
      <Typography variant="h4">View Customer</Typography>
    </Layout>
  );
}

page.loader = function () {
  return Promise.resolve({ name: "Nam Nguyen", Photo: "234" });
};
