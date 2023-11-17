import { IntlShape } from "react-intl";

declare module "@ikx/app" {
  export interface App {
    intl: IntlShape;
    formatMessage: IntlShape["formatMessage"];
  }
}
