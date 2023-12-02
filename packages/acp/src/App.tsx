import messages from "./bundle/messages.json";
import services from "./bundle/services";
import views from "./bundle/views";

import { createApp } from "@ikx/core";
import Composer from "./Composer";
import GlobalStyles from "./GlobalStyles";
import theme from "./theme";

function App() {
  const app = createApp({ theme });
  app.extend(services);
  app.extend({ dispatch: () => 0 });
  app.jsx.extend(views);

  return (
    <Composer app={app} messages={messages}>
      <GlobalStyles />
    </Composer>
  );
}

export default App;
