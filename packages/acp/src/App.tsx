import { Composer } from "@ikx/composer";

import Content from "./pages/Content";
import services from "./bundle/service";
import messages from "./bundle/messages.json";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";

function App() {
  return (
    <Composer boot={services} messages={messages}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Composer>
  );
}

export default App;
