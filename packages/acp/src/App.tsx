import { Composer } from "@ikx/composer";

import Content from "./pages/Content";
import services from "./bundle/services";
import views from "./bundle/views";
import messages from "./bundle/messages.json";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { createApp } from "@ikx/core";

function App() {
  const app = createApp();
  app.extend(services);
  app.jsx.extend(views);

  return (
    <Composer app={app} messages={messages}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </Composer>
  );
}

export default App;
