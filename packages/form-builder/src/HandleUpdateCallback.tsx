import { FormikValues, useFormikContext } from "formik";
import { useEffect } from "react";
import { FormBuilderProps, FormBuilderSchema } from "./types";

type Props = {
  schema: FormBuilderSchema;
  onUpdate?: FormBuilderProps["onUpdate"];
  onChange?: FormBuilderProps["onChange"];
};

export function HandleUpdateCallback(props: Props) {
  const { onUpdate, onChange, schema } = props;
  const formik = useFormikContext<FormikValues>();

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
