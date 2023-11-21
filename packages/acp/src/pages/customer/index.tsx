/**
 * @type: route
 * @name: customer
 * @path: /customer
 */
import { Layout } from "@ikx/jsx";
import { Typography } from "@mui/material";

export default function index(props: unknown) {
  console.log({ props });
  console.log(index.loader);
  return (
    <Layout name="layout.master">
      <Typography variant="h4">Browse </Typography>
    </Layout>
  );
}

index.loader = async function () {
  console.log("use loader to fill props");
};
