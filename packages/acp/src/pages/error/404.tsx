/**
 * @type: route
 * @name: err404
 * path: /error/404
 */

import { Layout } from "@ikx/jsx";

import Screen from "./screen";
export default function Page() {
  return (
    <Layout name="layout.master">
      <Screen
        banner="/error/404.png"
        title="404: The page you are looking for isn’t here"
        helpText="You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation."
      />
    </Layout>
  );
}
