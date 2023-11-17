import { IntlShape } from "react-intl";

declare module "@ikx/core" {
  export interface App {
    intl: IntlShape;
    formatMessage: IntlShape["formatMessage"];
  }
}
