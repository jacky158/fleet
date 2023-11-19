import messages from "./bundle/messages.json";
import services from "./bundle/services";
import views from "./bundle/views";

import { createApp } from "@ikx/core";
import { Route, Routes } from "react-router-dom";
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
      <Routes>
        {routes.map(({ path, Component }, index) => (
          <Route path={path} Component={Component} key={index.toString()} />
        ))}
        <Route path="*" Component={PageNotFound} />
      </Routes>
    </Composer>
  );
}

export default App;
