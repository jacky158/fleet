import { createApp, Provider } from "@ikx/core";
import { IntlProvider } from "@ikx/intl";
import {
  ThemeProvider,
  ToastHandler,
  FeedbackHandler,
  AlertHandler,
  ConfirmHandler,
  MenuHandler,
} from "@ikx/mui";
import HelmetHandler from "@ikx/helmet";
import { ModalHandler } from "@ikx/mui";
import { ReactNode } from "react";
import "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import localizedFormat from "dayjs/plugin/localizedFormat";
// dayjs.extend(localizedFormat);

export default function Composer({
  children,
  boot,
  messages,
}: {
  children: ReactNode;
  boot: Record<string, unknown>;
  messages: Record<string, string>;
}) {
  const app = createApp();
  app.extend(boot);

  return (
    <Provider app={app}>
      <IntlProvider locale="en" messages={messages} defaultLocale="en">
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <HelmetHandler />
            <ModalHandler />
            <MenuHandler />
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
