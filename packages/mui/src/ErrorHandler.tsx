
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApp } from "@ikx/core";
import get from "lodash/get";
import { useCallback, useEffect, useState } from "react";

export default function ErrorHandler() {
  const app = useApp();
  const [, setError] = useState<unknown>();

  const handleError = useCallback((err: unknown, formik: unknown) => {
    setError(err);
    const errors = get(err, "response.data.errors");
    if ((formik as any)?.setErrors) {
      (formik as any).setErrors(errors);
    }
  }, []);

  useEffect(() => {
    app.extend({ handleError });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
