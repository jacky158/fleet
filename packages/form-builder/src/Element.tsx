import { FormikProps, FormikValues, connect } from "formik";
import React from "react";
import { FormBuilderSchema } from "./types";
import Render from "./Render";

type ElementRendererProps = {
  formik: FormikProps<FormikValues>;
  schema: FormBuilderSchema;
};

const ElementComponent = ({ schema, formik }: ElementRendererProps) => {
  return <Render config={schema} formik={formik} />;
};

export const Element: React.FC<ElementRendererProps> = connect(
  React.memo(
    ElementComponent,
    ({ schema, formik }, nextProps) =>
      schema === nextProps.schema &&
      formik.initialValues === nextProps.formik.initialValues &&
      formik.isValidating === nextProps.formik.isValidating &&
      formik.isSubmitting === nextProps.formik.isSubmitting
  )
);

export default Element;
