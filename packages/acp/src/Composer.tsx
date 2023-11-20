/* eslint-disable @typescript-eslint/no-explicit-any */
import { App, Provider } from "@ikx/core";
import HelmetHandler from "@ikx/helmet";
import { IntlProvider } from "@ikx/intl";
import {
  AlertHandler,
  ConfirmHandler,
  FeedbackHandler,
  MenuHandler,
  ModalHandler,
  PopoverHandler,
  ThemeProvider,
  ToastHandler,
} from "@ikx/mui";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs";
import { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import localizedFormat from "dayjs/plugin/localizedFormat";
// dayjs.extend(localizedFormat);
import routes from "./bundle/routes";
import GlobalStyles from "./GlobalStyles";
import PageNotFound from "./pages/PageNotFound";

const Handlers = () => {
  return (
    <>
      <HelmetHandler />
      <PopoverHandler />
      <ModalHandler />
      <MenuHandler />
      <ToastHandler />
      <FeedbackHandler />
      <AlertHandler />
      <ConfirmHandler />
    </>
  );
};

export default function Composer({
  app,
  messages,
}: {
  children: ReactNode;
  app: App;
  messages: unknown;
}) {
  return (
    <Provider app={app}>
      <IntlProvider locale="en" messages={messages as any} defaultLocale="en">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider>
            <GlobalStyles />
            <BrowserRouter>
              <Handlers />
              <Routes>
                {routes.map(({ path, Component }, index) => (
                  <Route
                    path={path}
                    Component={Component}
                    key={index.toString()}
                  />
                ))}
                <Route path="*" Component={PageNotFound} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </LocalizationProvider>
      </IntlProvider>
    </Provider>
  );
}
