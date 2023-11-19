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
import "dayjs";
import { ReactNode } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import routes from "./bundle/routes";
// import localizedFormat from "dayjs/plugin/localizedFormat";
// dayjs.extend(localizedFormat);

export default function Composer({
  children,
  app,
  messages,
}: {
  children: ReactNode;
  app: App;
  messages: unknown;
}) {
  const router = createBrowserRouter(routes, { basename: "/" });
  return (
    <Provider app={app}>
      <IntlProvider locale="en" messages={messages as any} defaultLocale="en">
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
            <BrowserRouter basename="/">{children}</BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </IntlProvider>
    </Provider>
  );
}
