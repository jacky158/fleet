import { useApp } from "@ikx/core";
import { FormikValues, useFormikContext } from "formik";
import isArray from "lodash/isArray";
import isString from "lodash/isString";
import { useEffect, useRef } from "react";

const flatErrors = (errors: Record<string, string[]>): string => {
  const result: Record<string, string> = {};

  Object.keys(errors).forEach((name) => {
    result[name] = isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name].toString();
  });

  return Object.values(result).join(", ");
};

export function HandleAlertError({
  alertPreSubmitError,
}: {
  alertPreSubmitError?: boolean | string;
}) {
  const formik = useFormikContext<FormikValues>();
  const submitCount = useRef<number>(0);
  const app = useApp();

  useEffect(() => {
    if (
      alertPreSubmitError &&
      !formik.isValidating &&
      !formik.isSubmitting &&
      submitCount.current < formik.submitCount &&
      formik.errors
    ) {
      submitCount.current = formik.submitCount;
      const message = isString(alertPreSubmitError)
        ? alertPreSubmitError
        : flatErrors(formik.errors as unknown as Record<string, string[]>);

      if (message) {
        app.alert({ message });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.isValidating]);

  return null;
}

export default HandleAlertError;
