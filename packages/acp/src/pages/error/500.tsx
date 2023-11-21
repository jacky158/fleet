/**
 * @type: route
 * @name: err500
 * path: /error/500
 */

import { Layout } from "@ikx/jsx";
import Screen from "./screen";

export default function Page() {
  return (
    <Layout name="layout.master">
      <Screen
        banner="/error/500.png"
        title="500: Internal Server Error"
        helpText="You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation."
      />
    </Layout>
  );
}
