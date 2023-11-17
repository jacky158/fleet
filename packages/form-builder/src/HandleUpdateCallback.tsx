import { FormikProps, FormikValues } from "formik";
import { useEffect } from "react";
import { FormBuilderProps, FormBuilderSchema } from "./types";

type Props = {
  schema: FormBuilderSchema;
  formik: FormikProps<FormikValues>;
  onUpdate?: FormBuilderProps["onUpdate"];
  onChange?: FormBuilderProps["onChange"];
};

export function HandleUpdateCallback(props: Props) {
  const { onUpdate, onChange, schema, formik } = props;

  /**
   * Callback if provided will be called when form values change
   */
  useEffect(() => {
    if (typeof onUpdate == "function") {
      onUpdate(formik);
    }

    if (typeof onChange == "function") {
      onChange({ values: formik.values, schema, form: formik });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik, formik.values, schema]);

  return null;
}

export default HandleUpdateCallback;
