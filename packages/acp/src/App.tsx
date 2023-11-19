import messages from "./bundle/messages.json";
import services from "./bundle/services";
import views from "./bundle/views";

import { createApp } from "@ikx/core";
import { Route, Routes, createBrowserRouter } from "react-router-dom";
import Composer from "./Composer";
import GlobalStyles from "./GlobalStyles";

import routes from "./bundle/routes";
import PageNotFound from "./pages/PageNotFound";

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
