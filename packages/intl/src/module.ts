import { IntlShape } from "react-intl";

declare module "@ikx/core" {
  export interface App {
    intl: IntlShape;
    t(id: string): string;
    formatMessage: IntlShape["formatMessage"];
  }
}
