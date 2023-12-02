import messages from "./bundle/messages.json";
import services from "./bundle/services";
import views from "./bundle/views";
import { createStore, ReduxProvider } from "@ikx/redux";

import { createApp } from "@ikx/core";
import Composer from "./Composer";
import GlobalStyles from "./GlobalStyles";
import theme from "./theme";
import reducers from "./bundle/reducers";
import sagas from "./bundle/sagas";

function App() {
  const app = createApp({ theme });
  const store = createStore({
    app,
    reducers,
    sagas,
  });
  app.extend(services);
  app.extend({ dispatch: store.dispatch });
  app.jsx.extend(views);
  window.APP = app;

  return (
    <ReduxProvider store={store}>
      <Composer app={app} messages={messages}>
        <GlobalStyles />
      </Composer>
    </ReduxProvider>
  );
}

export default App;
