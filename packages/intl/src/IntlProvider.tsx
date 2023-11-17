import useApp from "@ikx/app";
import { ReactNode, useMemo } from "react";
import {
  IntlShape,
  RawIntlProvider,
  ResolvedIntlConfig,
  createIntl,
} from "react-intl";

export default function IntlProvider({
  locale,
  defaultLocale,
  messages,
  children,
  ...props
}: Pick<ResolvedIntlConfig, "locale" | "defaultLocale" | "messages"> & {
  children: ReactNode;
}) {
  const app = useApp();

  const intl: IntlShape = useMemo(() => {
    const intl = createIntl({
      locale,
      defaultLocale,
      messages,
      ...props,
    });
    // append intl
    app.formatMessage = intl.formatMessage;
    return intl;
  }, [defaultLocale, app, locale, messages, props]);

  app.extend({ intl });

  return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
}
