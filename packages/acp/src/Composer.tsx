/* eslint-disable @typescript-eslint/no-explicit-any */
import { App, Provider } from "@ikx/core";
import HelmetHandler from "@ikx/helmet";
import { IntlProvider } from "@ikx/intl";
import { ScrollProvider } from "@ikx/scroll";
import {
  AlertHandler,
  ConfirmHandler,
  FeedbackHandler,
  ModalHandler,
  PopoverHandler,
  ThemeProvider,
  ToastHandler,
} from "@ikx/mui";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs";
import { ReactNode } from "react";
// import localizedFormat from "dayjs/plugin/localizedFormat";
// dayjs.extend(localizedFormat);
import routes from "./bundle/routes";
import GlobalStyles from "./GlobalStyles";
import { Provider as RouteProvider, Routes } from "@ikx/router";

const Handlers = () => {
  return (
    <>
      <HelmetHandler />
      <PopoverHandler />
      <ModalHandler />
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
        <ScrollProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider>
              <GlobalStyles />
              <RouteProvider routes={routes} baseUrl="/acp">
                <Handlers />
                <Routes base="root" />
              </RouteProvider>
            </ThemeProvider>
          </LocalizationProvider>
        </ScrollProvider>
      </IntlProvider>
    </Provider>
  );
}
