import messages from "./bundle/messages.json";
import services from "./bundle/services";
import views from "./bundle/views";

import { createApp } from "@ikx/core";
import { Route, Routes } from "react-router-dom";
import Composer from "./Composer";
import Account from "./pages/Account";
import Analytics from "./pages/Analytics";
import Customer from "./pages/Customer";
import Dashboard from "./pages/Dashboard";
import ECommerce from "./pages/ECommerce";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import GlobalStyles from "./GlobalStyles";

function App() {
  const app = createApp();
  app.extend(services);
  app.jsx.extend(views);

  return (
    <Composer app={app} messages={messages}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/account" element={<Account />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/e-commerce" element={<ECommerce />} />
        <Route path="/customer/view" element={<Customer />} />
      </Routes>
    </Composer>
  );
}

export default App;
