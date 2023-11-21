/**
 * @type: route
 * @name: err403
 * path: /error/403
 */

import { Layout } from "@ikx/jsx";
import Screen from "./screen";

export default function Page() {
  return (
    <Layout name="layout.master">
      <Screen
        banner="/error/401.png"
        title="401: Permission Denied"
        helpText="You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation."
      />
    </Layout>
  );
}
