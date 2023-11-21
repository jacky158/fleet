/**
 * @type: route
 * @name: err401
 * path: /error/401
 */

import { Layout } from "@ikx/jsx";
import Screen from "./screen";

export default function Page() {
  return (
    <Layout name="layout.master">
      <Screen
        banner="/error/401.png"
        title="401: Authorization required"
        helpText="You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation."
      />
    </Layout>
  );
}
