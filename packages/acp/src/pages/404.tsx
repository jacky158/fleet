/**
 * @type: route
 * @name: err-404
 * path: /error/404
 */

import { Layout } from "@ikx/jsx";

export default function Page() {
  return <Layout name="layout.master">404 not found</Layout>;
}
