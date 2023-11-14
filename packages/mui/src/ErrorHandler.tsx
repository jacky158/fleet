import { useCallback, useEffect, useState } from "react";
import { useApp } from "fleet-core";

export default function ErrorHandler() {
  const app = useApp();
  const [, setError] = useState<unknown>();

  const handleError = useCallback((err: unknown, formik: unknown) => {
    setError(err);
    const errors = (err as any)?.response?.data?.errors;
    if (formik) {
      (formik as any).setErrors(errors);
    }
  }, []);

  useEffect(() => {
    app.addService({ handleError });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
