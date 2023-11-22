/* eslint-disable @typescript-eslint/no-explicit-any */
import { App, Provider } from "@ikx/core";
import HelmetHandler from "@ikx/helmet";
import { IntlProvider } from "@ikx/intl";
import {
  AlertHandler,
  ConfirmHandler,
  FeedbackHandler,
  ModalHandler,
  ThemeProvider,
  ToastHandler,
} from "@ikx/mui";
import "dayjs";
import { ReactNode } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
  return (
    <Provider app={app}>
      <IntlProvider locale="en" messages={messages as any} defaultLocale="en">
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <HelmetHandler />
            <ModalHandler />
            <ToastHandler />
            <FeedbackHandler />
            <AlertHandler />
            <ConfirmHandler />
            {children}
          </LocalizationProvider>
        </ThemeProvider>
      </IntlProvider>
    </Provider>
  );
}
