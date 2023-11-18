import { useApp } from "@ikx/core";
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
      onError() {
        // avoid error
        // todo listen error to translate.
      },
      ...props,
    });
    // append intl
    app.formatMessage = intl.formatMessage;
    return intl;
  }, [defaultLocale, app, locale, messages, props]);

  app.extend({
    intl,
    formatMessage: intl.formatMessage,
    t(id: string, values?: Record<string, unknown>) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return intl.formatMessage({ id }, values as any);
    },
  });

  return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
}
