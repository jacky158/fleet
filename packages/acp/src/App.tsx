import messages from "./bundle/messages.json";
import services from "./bundle/services";
import views from "./bundle/views";

import { createApp } from "@ikx/core";
import Composer from "./Composer";
import GlobalStyles from "./GlobalStyles";

function App() {
  const app = createApp();
  app.extend(services);
  app.jsx.extend(views);

  return (
    <Composer app={app} messages={messages}>
      <GlobalStyles />
    </Composer>
  );
}

export default App;
